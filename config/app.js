module.exports = {
	server: {
		port: process.env.PORT || 3000
	},
	database: {
		mongo: {
			url: 'mongodb://localhost/',
			name: 'neon',
			user: 'neon',
			password: 'password'
		}
	},
	auth: {
		jwt: {
			secret: 'super secret'
		}
	}
};
