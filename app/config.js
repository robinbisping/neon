const config = {
	server: {
		port: process.env.PORT || 3000
	},
	db: {
		url: 'mongodb://localhost/',
		name: 'neon',
		user: 'neon',
		password: 'password'
	},
	auth: {
		secret: 'super secret'
	}
};

module.exports = config;
