function isAdmin(request, response, next) {
	return request.user.isAdmin ? next() : response.redirect('/');
}

module.exports = { isAdmin };