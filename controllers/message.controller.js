const Message = require('../models/message.model');

const getChat = async (req, res) => {
	const myId = req.uid;
	const messageBy = req.params.by;

	const last30 = await Message.find({
		$or: [
			{ by: myId, from: messageBy },
			{ by: messageBy, from: myId },
		],
	})
		.sort({ createdAt: 'desc' })
		.limit(30);

	return res.json({
		ok: true,
		messages: last30,
	});
};

module.exports = {
	getChat,
};
