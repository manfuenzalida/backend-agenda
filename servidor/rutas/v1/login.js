const express = require('express');
const { login, signup } = require('../../controladores/v1/login');
const { validateSingup } = require('../../validaciones/login');
const router = express.Router();
router.post('/login', login);
router.post('/signup', validateSingup, signup);
module.exports = router;
