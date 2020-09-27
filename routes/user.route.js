const { Router } = require('express');
const { getUsers } = require('../controllers/user.controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', [validateJWT], getUsers);

module.exports = router;
