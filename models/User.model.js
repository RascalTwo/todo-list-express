const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		enum: ['admin'],
	},
});

UserSchema.virtual('todos', {
  ref: 'Todo',
  localField: '_id',
  foreignField: 'owner'
});

module.exports = mongoose.model('User', UserSchema);