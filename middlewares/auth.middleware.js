function isAuthenticated(request, response, next) {
	return request.isAuthenticated() ? next() : response.redirect('/');
}

module.exports = { isAuthenticated };