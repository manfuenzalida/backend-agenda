const { body, validationResult } = require('express-validator');
const { Promise } = require('mongoose');
const ModeloUsuario = require('../modelos/usuarios');
const pSignup = [
  body("email")
    .isEmail()
    .withMessage('Ingrese un email valido')
    .custom((value) => {
      return ModeloUsuario.findOne({ email: value }).then(userDoc => {
        if (userDoc) {
          return Promise.reject('Este email ya existe!!! : valitor')
        }
      });
    }).normalizeEmail(),

  body("name").trim()
    .not()
    .isEmpty(),
  body("password").trim()
    .isLength({ min: 6 })
    .withMessage("minimo 6 caracteres")
];

const vSingup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Error funcion vSingup : validacion');
    error.statusCode = 400;
    error.data = errors.array()
    return next(error);
  }
  next();
}
const validateSingup = [pSignup, vSingup];
module.exports = {
  validateSingup
}