const { Schema, model } = require('mongoose');

const MessageSchema = Schema(
	{
		by: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		from: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

MessageSchema.method('toJSON', function () {
	const { __v, _id, password, ...object } = this.toObject();
	return object;
});

module.exports = model('Message', MessageSchema);