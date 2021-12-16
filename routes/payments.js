const { Router } = require('express');
const { check } = require('express-validator');
const { postPayment, getPaymentMonthly, getPayments, getAllPayments, postStatus, getPaymentByUser, getPaymentById, putEarnings } = require('../controllers/payments');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = new Router();

router.get('/', [
    validateJWT,
    validateFields
], getPaymentByUser)

router.get('/all', [
    validateJWT,
    validateFields
], getAllPayments)


router.get('/appointmentsMonthly/', [
    validateJWT,
    validateFields
], getPaymentMonthly)

router.get('/:id', [
    validateJWT,
    check('id', 'El id es obligatorio').notEmpty(),
    check('id', 'El id es invalido').isMongoId(),
    validateFields
], getPaymentById)

router.get('/appointments', [
    validateJWT,
    validateFields
], getPayments)

router.post('/setStatus/:id', [
    validateJWT,
    check('id', 'El id es obligatorio').notEmpty(),
    check('id', 'El id es invalido').isMongoId(),
    check('status', 'El estado es obligatorio').notEmpty(),
    check('status', 'El estado debe de ser string').isString(),
    validateFields
], postStatus)

router.post('/', [
    validateJWT,
    check('orderID', 'El id de orden es obligatorio').notEmpty(),
    check('date', 'La fecha de orden es obligatorio').notEmpty(),
    check('time', 'La hora de orden es obligatorio').notEmpty(),
    check('id', 'El id de servicio es obligatorio').notEmpty(),
    validateFields
], postPayment);


router.put('/', [
    validateJWT,
    validateFields
], putEarnings)


module.exports = router;