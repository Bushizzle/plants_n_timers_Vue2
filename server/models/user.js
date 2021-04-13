const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
	username: {type: String, required: 'UserNameInvalid'},
	email: {type: String, unique: true, lowercase: true, required: 'EmailInvalid'},
	password: {type: String, required: 'PasswordInvalid'},
	roles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Role',
		}
	],
	plants: [ mongoose.Schema.Types.ObjectId ],
	friends: [ mongoose.Schema.Types.ObjectId ],
});

module.exports = mongoose.model('User', userSchema);
