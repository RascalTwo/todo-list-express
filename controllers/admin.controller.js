
const db = require('../models/index.model.js');

async function admin(request, response) {
	const users = await db.db.collection('users').find().toArray();
	for (const user of users) user.items = []
	const items = await db.db.collection('todos').find().toArray();
	for (const item of items){
		const user = users.find(user => user._id.toString() === item.owner.toString());
		user.items.push(item);
	}
	response.render('admin.ejs', { users })
}

module.exports = { admin }