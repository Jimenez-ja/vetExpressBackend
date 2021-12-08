const { Router } = require('express');
const { check } = require('express-validator');
const { postPayment, getPaymentById } = require('../controllers/payments');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = new Router();

router.get('/', [
    validateJWT,
    validateFields
], getPaymentById)

router.post('/', [
    validateJWT,
    check('orderID', 'El id de orden es obligatorio').notEmpty(),
    check('date', 'La fecha de orden es obligatorio').notEmpty(),
    check('time', 'La hora de orden es obligatorio').notEmpty(),
    check('id', 'El id de servicio es obligatorio').notEmpty(),
    validateFields
], postPayment);


module.exports = router;