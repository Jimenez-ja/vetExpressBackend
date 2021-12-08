const { Router } = require('express');
const { check } = require('express-validator');
const { getPets, postPet, getOwnerPet } = require('../controllers/pet');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = new Router();

//Mostar mascotas paginadas
router.get('/', [], getPets);

//mostar mascotas por dueño
router.get('/owner', [
    validateJWT,
    validateFields
], getOwnerPet)

router.post('/', [
    validateJWT,
    check('type', 'El tipo es obligatorio').notEmpty(),
    check('type', 'El tipo debe de ser string').isString(),
    check('race', 'La raza es obligatoria').notEmpty(),
    check('race', 'La raza debe de ser string').isString(),
    check('size', 'El tamaño es obligatorio').notEmpty(),
    check('size', 'El tamaño debe de ser string').isString(),
    check('sex', 'El sexo es obligatorio').notEmpty(),
    check('sex', 'El sexo debe de ser string').isString(),
    check('age', 'La edad es obligatoria').notEmpty(),
    check('age', 'La edad debe de ser entero').isInt(),
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('name', 'El nombre debe de ser string').isString(),
    validateFields
], postPet)

module.exports = router;