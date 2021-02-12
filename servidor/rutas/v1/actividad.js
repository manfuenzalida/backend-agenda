const express = require('express');
const {
  getId, listar, guardar, borrarId, getActividadbyFecha, listarOnlyUser
} = require('../../controladores/v1/actividad');
const { isTokenValido, isRolAdmin, isRolUser } = require('../../middleware/authorization');
const router = express.Router();
router.get('/actividad/user/:idUser', isTokenValido, isRolUser, listarOnlyUser);
router.get('/actividad', isTokenValido, isRolAdmin, listar);
router.get('/actividad/:id', isTokenValido, getId);
router.get('/actividad/fecha/:fecha', isTokenValido, isRolUser, getActividadbyFecha);
router.post('/actividad', isTokenValido, isRolUser, guardar);
router.delete('/actividad/:id', isTokenValido, isRolAdmin, borrarId);
module.exports = router;