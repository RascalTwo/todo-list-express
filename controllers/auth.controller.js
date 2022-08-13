const passport = require('passport')
const bcrypt = require('bcrypt');
const db = require('../models/index.model.js');

const signIn = [
	passport.authenticate('local', { failureRedirect: '/' }),
	(_, response) => response.redirect('/')
]

function signUp(request, response, done) {
	const { username, password } = request.body;
	return db.db.collection('users').findOne({ username }).then(async user => {
		if (user) return response.redirect('/')
		user = await db.db.collection('users').insertOne({ username, password: await bcrypt.hash(password, 10) })
		request.login(user, err => {
			if (err) return done(err)
			return response.redirect('/')
		})
	}).catch(done)
}

function logout(request, response, done) {
	request.logout(err => {
		if (err) return done(err)
		return response.redirect('/')
	})
}

module.exports = { signIn, signUp, logout }