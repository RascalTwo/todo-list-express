const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	thing: {
		type: String,
		required: true
	},
	completed: {
		type: Boolean,
		required: true
	},
	deletedAt: {
		type: Date,
	},
});

TodoSchema.pre('updateOne', function(next){
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model('Todo', TodoSchema);