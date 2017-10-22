const boom = require('boom');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('../config');
const User = require('../user/user-model');

passport.use(
	new BasicStrategy(function (email, password, next) {
		User.findOne({ email: email }).select('+password').exec(function (err, user) {
			if (err) {
				return next(err);
			}
			// User does not exist
			if (!user) {
				return next(boom.unauthorized('User does not exist.'), false);
			}
			// Verify password
			user.comparePassword(password, function (err, isMatch) {
				if (err) {
					return next(err);
				}
				// Wrong password
				if (!isMatch) {
					return next(boom.unauthorized('Invalid password.'), false);
				}
				// Username and password correct
				return next(null, user);
			});
		});
	})
);

passport.use(
	new JwtStrategy({
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: config.auth.secret
	}, function (payload, next) {
		User.findById(payload.id, function (err, user) {
			if (err) {
				return next(err, false);
			}
			if (!user) {
				return next(boom.unauthorized('User does not exist.'), false);
			}
			return next(null, user);
		});
	})
);
