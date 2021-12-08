const { Router } = require('express');
const { Check, check } = require('express-validator');
const { login, validJWT } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = new Router();

router.post('/login', [
    check('email', 'El email es obligatorio').notEmpty(),
    check('email', 'El email es invalido').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
    validateFields
], login)


router.post('/validateJWT', [
    validateJWT,
    validateFields
], validJWT)

module.exports = router;