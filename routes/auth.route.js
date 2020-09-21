const { Router } = require('express');
const {
	createUser,
	loginUser,
	renewToken,
} = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validateParams } = require('../middlewares/validate-params');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post(
	'/new',
	[
		check('name', 'The name is required').not().isEmpty(),
		check('email', 'The email is required').isEmail(),
		check('password', 'The password is required').not().isEmpty(),
		validateParams,
	],
	createUser
);

router.post(
	'/',
	[
		check('email', 'The email is required').isEmail(),
		check('password', 'The password is required').not().isEmpty(),
		validateParams,
	],
	loginUser
);

router.get('/renew', [validateJWT], renewToken);

module.exports = router;
