
const db = require('../models/index.model.js');

async function homepage(request, response) {
	// Access the `todos` collection from the connected database, calling `find` with no filter object to retrieve all the documents, and finally call `toArray` to turn this query into a Promise that will resolve with an array of document objects.
	const todoItems = await db.db.collection('todos').find().toArray()
	// Access the `todos` collection from the connected database, calling `countDocuments` with a filter to only include documents that have a `completed` property set to `false`.
	const itemsLeft = await db.db.collection('todos').countDocuments({completed: false})
	// Tell express to render the `index.ejs` view with the options of the `todoItems` and `itemsLeft` variables, which EJS will use as variables in the view.
	response.render('index.ejs', { items: todoItems, left: itemsLeft })
	// db.collection('todos').find().toArray()
	// .then(data => {
	//     db.collection('todos').countDocuments({completed: false})
	//     .then(itemsLeft => {
	//         response.render('index.ejs', { items: data, left: itemsLeft })
	//     })
	// })
	// .catch(error => console.error(error))
}

module.exports = { homepage }