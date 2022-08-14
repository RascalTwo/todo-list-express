function generateFilter(request, response, next){
	const filter = {
		...request.user.generateTodoFilter(),
		thing: request.body.itemFromJS
	}
	request.todoFilter = filter
	next();
}

module.exports = { generateFilter }