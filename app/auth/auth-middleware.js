const passport = require('passport');

exports.basicAuth = passport.authenticate('basic', { session: false });
exports.jwtAuth = passport.authenticate('jwt', { session: false });
