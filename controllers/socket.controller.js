const User = require('../models/user.model');
const Message = require('../models/message.model');

const userConnected = async (uid = '') => {
	const user = await User.findById(uid);
	user.online = true;
	await user.save();
	return user;
};

const userDiconnected = async (uid = '') => {
	const user = await User.findById(uid);
	user.online = false;
	await user.save();
	return user;
};

const saveMessage = async (payload) => {
	try {
		const message = new Message(payload);
		await message.save();
	} catch (err) {
		return false;
	}
};

module.exports = {
	userConnected,
	userDiconnected,
	saveMessage,
};
