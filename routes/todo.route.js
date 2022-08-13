
const router = require('express').Router();
const { addTodo, markComplete, markUnComplete, deleteItem } = require('../controllers/todo.controller.js');

// Add a custom request handler to the `POST` method of the `/addTodo` path
router.post('/addTodo', addTodo)

// Add a custom request handler to the `POST` method of the `/markComplete` path
router.put('/markComplete', markComplete)

// Add a custom request handler to the `PUT` method of the `/markUnComplete` path
router.put('/markUnComplete', markUnComplete)

// Add a custom request handler to the `DELETE` method of the `/deleteTodo` path
router.delete('/deleteItem', deleteItem)

module.exports = router;