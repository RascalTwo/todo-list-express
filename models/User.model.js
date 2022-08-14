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
}, {
	virtuals: {
		isAdmin: {
			get() {
				return this.role === 'admin';
			}
		}
	}
});

UserSchema.virtual('todos', {
  ref: 'Todo',
  localField: '_id',
  foreignField: 'owner'
});

UserSchema.method('generateTodoFilter', function() {
  return { owner: this._id, deletedAt: { $exists : false } }
});

module.exports = mongoose.model('User', UserSchema);