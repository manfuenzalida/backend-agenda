
const ModeloUsuario = require('../../modelos/usuarios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function errorHandler(err, next, item) {
  if (err) return next(err);
  if (!item) {
    const error = new Error('usuario o (password) incorrecto');
    error.statusCode = 400;
    return next(error);
  }
}

//login valida acceso
const login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  ModeloUsuario.findOne({ email: email }, (err, item) => {
    if (err || !item) return errorHandler(err, next, item)
    if (!bcrypt.compareSync(password, item.password)) {
      return res.status(401).json({
        result: true,
        message: 'usuario o clave incorrecta'
      });
    }

    let payload = {
      usuarioId: item._id,
      rol: item.rol
    }

    let token = jwt.sign(
      payload,
      process.env.AUTH_JWT_TOKEN,    //CLAVE WEP 256-bit Key
      { expiresIn: '2h' }
    );

    let user = item.toObject();
    delete user.password;

    res.json({
      result: true,
      data: {
        usuarioId: item._id,
        rol: item.rol,
        token: token
      }
    });

  })
}

// Nuevos Usuarios
const signup = (req, res, next) => {
  let data = {
    name: req.body.name,
    rol: req.body.rol,
    genero: req.body.genero,
    pais: req.body.pais,
    comuna: req.body.comuna,
    telefono: req.body.telefono,
    edad: req.body.edad,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  }
  let modelUsuario = new ModeloUsuario(data);
  modelUsuario.save((err, item) => {
    if (err || !item) return errorHandler(err, next, item);
    res.json({
      result: true,
      item: item
    })
  });
}

module.exports = { signup, login };
