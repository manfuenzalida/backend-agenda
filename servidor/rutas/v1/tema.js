const express = require('express');
const {
  getId, listar, guardar, actualizar, borrarId
} = require('../../controladores/v1/tema');
const { isTokenValido, isRolAdmin, isRolUser } = require('../../middleware/authorization');
const router = express.Router();
router.get('/tema', isTokenValido, listar);
router.get('/tema/:id', isTokenValido, getId);
router.post('/tema', isTokenValido, isRolAdmin, guardar);
router.put('/tema/:id', isTokenValido, actualizar);
router.delete('/tema/:id', borrarId);
module.exports = router;