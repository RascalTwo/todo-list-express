function isAdmin(request, response, next) {
	return request.user.role === 'admin' ? next() : response.redirect('/');
}

module.exports = { isAdmin };