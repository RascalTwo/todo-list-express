
const Todo = require('../models/Todo.model.js');


// Add a custom request handler to the `POST` method of the `/addTodo` path
function addTodo(request, response) {
	// Access the `todos` collection from the connected database, calling `insertOne` with an object containing the properties `thing` and `completed` set to the values of the `request.body.todoItem` - parsed by the `urlencoded` middleware - and `false` respectively.
	new Todo({thing: request.body.todoItem, completed: false, owner: request.user._id }).save()
	// After the insertion is successful, redirect the user to the `/` path.
	.then(result => {
			console.log('Todo Added')
			response.redirect('/')
	})
	// If the insertion fails, log the error to the console.
	.catch(error => console.error(error))
}

// Add a custom request handler to the `POST` method of the `/markComplete` path
function markComplete (request, response) {
	console.log(request.todoFilter)
	// Access the `todos` collection from the connected database, calling `updateOne` with a filter object containing the property `thing` set to the value of the `request.body.itemFromJS` property - parsed by the `json` middleware
	Todo.updateOne(request.todoFilter,{
			completed: true
	},{
			// Attempt to sort the document _id's descending to get the latest document first - this works because the `_id` is a `ObjectId` and these contain the second they were created encoded within them.
			sort: {_id: -1},
			// Disable the upsert - if the document does not exist, do not create it - this is
			upsert: false
	})
	// After the update is successful, redirect the user to the `/` path.
	.then(result => {
			console.log('Marked Complete')
			response.json('Marked Complete')
	})
	// If the update fails, log the error to the console.
	.catch(error => console.error(error))

}

// Add a custom request handler to the `PUT` method of the `/markUnComplete` path
function markUnComplete(request, response) {
	Todo.updateOne(request.todoFilter,{
			completed: false
	},{
			sort: {_id: -1},
			upsert: false
	})
	.then(result => {
			console.log('Marked Complete')
			response.json('Marked Complete')
	})
	.catch(error => console.error(error))

}

// Add a custom request handler to the `DELETE` method of the `/deleteTodo` path
function deleteItem (request, response) {
	// Access the `todos` collection from the connected database, calling `deleteOne` with a filter object containing the property `thing` set to the value of the `request.body.itemFromJS` property - parsed by the `json` middleware - to delete the first document that matches the filter.
	Todo.updateOne(request.todoFilter, {
		deletedAt: new Date()
	},{
		sort: {_id: -1},
		upsert: false
	})
	.then(result => {
			console.log('Todo Deleted')
			response.json('Todo Deleted')
	})
	.catch(error => console.error(error))

}

module.exports = { addTodo, markComplete, markUnComplete, deleteItem };