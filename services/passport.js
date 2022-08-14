const passport = require('passport')
const {ObjectId} = require('mongodb')
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User.model.js')

passport.serializeUser((user, done) => done(null, user._id.toString()));

passport.deserializeUser((id, done) =>
	User.findById(id)
		.then(user => done(null, user))
		.catch(done)
);

passport.use(new LocalStrategy(
  (username, password, done) => User.findOne({ username }).then(async user => {
		if (!user) { return done(null, false); }
		if (!await bcrypt.compare(password, user.password)) { return done(null, false); }
		return done(null, user);
	}).catch(done)
));

module.exports = app => {
	app.use(passport.initialize());
	app.use(passport.session());
}