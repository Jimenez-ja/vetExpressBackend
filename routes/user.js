const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, getUser, postUser, putUser, deleteUser } = require('../controllers/user');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = new Router();

//mostrar usuarios paginados
router.get('/', [

], getUsers);

//mostrar usuario por id
router.get('/:id', [

], getUser);

//crear usuario
router.post('/', [
    check('name', 'El name es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').notEmpty(),
    check('email', 'El email es invalido').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
    validateFields
], postUser);

//actualizar usuario
router.put('/', [
    validateJWT,
    validateFields
], putUser);

//actualizar usuario
router.delete('/', [], deleteUser);


module.exports = router;