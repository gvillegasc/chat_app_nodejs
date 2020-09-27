const { response } = require('express');
const User = require('../models/user.model');

const getUsers = async (req, res = response) => {
	const from = Number(req.query.from) || 0;
	const users = await User.find({
		_id: {
			$ne: req.uid,
		},
	})
		.sort('-online')
		.skip(from)
		.limit(5);

	return res.status(200).json({
		ok: true,
		users,
	});
};

module.exports = {
	getUsers,
};
