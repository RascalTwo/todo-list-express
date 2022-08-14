
const User = require('../models/User.model.js');

async function admin(request, response) {
	const users = await User.find().populate('todos').lean();
	response.render('admin', { users })
}

module.exports = { admin }