const { Router } = require('express');
const { check } = require('express-validator');
const { postService, getServices, getService, deleteService, putService } = require('../controllers/service');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = new Router();

router.get('/', [

], getServices);


router.get('/:id', [
    check('id', 'el id es obligatorio').notEmpty(),
    check('id', 'el id es invalido').isMongoId(),
    validateFields
], getService);

router.post('/', [
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('name', 'El nombre debe de ser string').isString(),
    check('description', 'La descripcion es obligatorio').notEmpty(),
    check('description', 'La descripcion debe de ser string').isString(),
    check('price', 'El precio es obligatorio').notEmpty(),
    check('price', 'El precio debe de ser un objeto').isObject(),
    check('namePerson', 'El nombre de la persona es obligatorio').notEmpty(),
    check('namePerson', 'El nombre de la persona debe de ser string').isString(),
    check('time', 'El tiempo aproximado es obligatorio').notEmpty(),
    check('time', 'El tiempo aproximado debe de ser string').isString(),
    validateFields
], postService);


router.put('/:id', [
    validateJWT,
    check('id', 'El id es obligatorio').notEmpty(),
    check('id', 'El id es invalido').isMongoId(),
    validateFields
], putService)

router.delete('/', [
    validateJWT,
    check('id', 'el id es obligatorio').notEmpty(),
    check('id', 'el id es invalido').isMongoId(),
    validateFields
], deleteService);



module.exports = router;