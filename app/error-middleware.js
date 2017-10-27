function handleError (err, req, res, next) {
	res.status(err.status || 500);
	res.json(err);
}

module.exports = handleError;
