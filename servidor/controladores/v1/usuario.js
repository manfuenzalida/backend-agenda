const ModeloUsuario = require('../../modelos/usuarios');
function errorHandler(err, next, item) {
  if (err) return next(err);
  if (!item) {
    const error = new Error('No existe');
    error.statusCode = 500;
    return next(error);
  }
}

// Trae a los usuarios registrados
const usuarios = (req, res, next) => {
  ModeloUsuario.find()
    .exec((err, item) => {
      if (err || !item) return errorHandler(err, next, item);
      res.json({
        result: true,
        data: item
      })
    });
}

// Trae registro de un usuario por su usuarioId
const usuarioById = (req, res, next) => {
  let id = req.params.id;
  ModeloUsuario.findById(id, (err, item) => {
    if (err || !item) return errorHandler(err, next, item);
    delete item.password
    res.json({
      result: true,
      data: item
    });
  });
}

module.exports = { usuarioById, usuarios };

