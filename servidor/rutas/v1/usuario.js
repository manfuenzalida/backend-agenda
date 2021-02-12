const express = require('express');

const {
    usuarioById,
    usuarios
} = require('../../controladores/v1/usuario');
const router = express.Router();
const { isTokenValido, isRolAdmin } = require('../../middleware/authorization');
router.get('/usuario/:id', isTokenValido, isRolAdmin, usuarioById);
router.get('/usuario', isTokenValido, isRolAdmin, usuarios);
module.exports = router;