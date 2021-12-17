const { Router } = require('express');
const { check } = require('express-validator');
const { postReview, getReview, getReviewByService, getAllReviews, getreviewsMonthly } = require('../controllers/review');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = new Router();


router.get('/', [
    validateJWT,
    validateFields
], getAllReviews)

router.get('/reviewsMonthly', [
    validateJWT,
    validateJWT
], getreviewsMonthly)

router.get('/:id', [
    validateJWT,
    check('id', 'El id es obligatorio').notEmpty(),
    check('id', 'El id es invalido').isMongoId(),
    validateFields
], getReview)

router.get('/service/:id', [
    check('id', 'El id es obligatorio').notEmpty(),
    check('id', 'El id es invalido').isMongoId(),
    validateFields
], getReviewByService)

router.post('/', [
    validateJWT,
    check('payment', 'El pago es obligatorio').notEmpty(),
    check('payment', 'El id de pago es invalido').isMongoId(),
    check('score', 'La calificacion es obligatoria').notEmpty(),
    check('score', 'La calificaion debe de ser entera').isInt(),
    check('title', 'El titulo es obligatorio').notEmpty(),
    check('title', 'El titulo debe de ser string').isString(),
    check('description', 'La descripcion es obligatoria').notEmpty(),
    check('description', 'La descripcion debe de ser string').isString(),
    validateFields
], postReview)


module.exports = router;