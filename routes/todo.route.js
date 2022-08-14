
const router = require('express').Router();
const { addTodo, markComplete, markUnComplete, deleteItem } = require('../controllers/todo.controller.js');
const { isAuthenticated } = require('../middlewares/auth.middleware.js');
const { generateFilter } = require('../middlewares/todo.middleware.js');

// Add a custom request handler to the `POST` method of the `/addTodo` path
router.post('/addTodo', isAuthenticated, addTodo)

// Add a custom request handler to the `POST` method of the `/markComplete` path
router.put('/markComplete', isAuthenticated, generateFilter, markComplete)

// Add a custom request handler to the `PUT` method of the `/markUnComplete` path
router.put('/markUnComplete', isAuthenticated, generateFilter, markUnComplete)

// Add a custom request handler to the `DELETE` method of the `/deleteTodo` path
router.delete('/deleteItem', isAuthenticated, generateFilter, deleteItem)

module.exports = router;