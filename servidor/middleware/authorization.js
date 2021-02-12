var jwt = require('jsonwebtoken');

let isTokenValido = (req, res, next) => {
  let token = req.get('Authorization');
  jwt.verify(token, process.env.AUTH_JWT_TOKEN, (err, decoded) => {
    if (err) {
      err.statusCode = 401;
      next(err);
    }
    req.usuario = decoded;
    next();
  });
}

let isRolUser = (req, res, next) => {
  let usuario = req.usuario;
  if (usuario.rol === 'user') {
    next();
  } else {
    let err = new Error('Accion no permitida para su rol de usuario');
    err.statusCode = 401;
    next(err)
  }
}

let isRolAdmin = (req, res, next) => {

  let usuario = req.usuario;
  if (usuario.rol === 'admin') {
    next();
  } else {
    let err = new Error('Accion no permitida para su rol de usuario');
    err.statusCode = 401;
    next(err)
  }
}

module.exports = { isTokenValido, isRolAdmin, isRolUser }