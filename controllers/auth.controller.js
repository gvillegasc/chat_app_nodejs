const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const emailExists = await UserModel.findOne({ email });
		if (emailExists) {
			return res.status(400).json({
				ok: false,
				message: 'Email is registered',
			});
		}

		const user = new UserModel(req.body);

		// Encrypt password
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		// Generate Token
		const token = await generateJWT(user.id);

		await user.save();
		return res.status(200).json({
			ok: true,
			token,
			user,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			error,
		});
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const userDB = await UserModel.findOne({ email });
		if (!userDB) {
			return res.status(400).json({
				ok: false,
				message: 'Email and/or password invalids',
			});
		}

		const validPassword = bcrypt.compareSync(password, userDB.password);
		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				message: 'Email and/or password invalids',
			});
		}

		const token = await generateJWT(userDB.id);
		return res.status(200).json({
			ok: true,
			token,
			user: userDB,
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			error,
		});
	}
};

const renewToken = async (req, res) => {
	const uid = req.uid;
	const token = await generateJWT(uid);
	const user = await UserModel.findById(uid);

	return res.status(200).json({
		ok: true,
		token,
		user,
	});
};

module.exports = {
	createUser,
	loginUser,
	renewToken,
};
