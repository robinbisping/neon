const config = {
	server: {
		port: process.env.PORT || 3000
	},
	db: {
		url: 'mongodb://localhost/',
		name: '',
		user: '',
		password: ''
	},
	auth: {
		secret: ''
	}
};

module.exports = config;
