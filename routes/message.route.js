const { Router } = require('express');
const { getChat } = require('../controllers/message.controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/:by', [validateJWT], getChat);

module.exports = router;
