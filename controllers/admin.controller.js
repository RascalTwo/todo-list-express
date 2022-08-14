
const db = require('../models/index.model.js');

async function admin(request, response) {
	const users = await db.db.collection('users').aggregate([
		{ $lookup: { from: 'todos', localField: '_id', foreignField: 'owner', as: 'items' } }
	]).toArray();
	response.render('admin.ejs', { users })
}

module.exports = { admin }