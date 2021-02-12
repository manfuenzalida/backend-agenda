const ModeloTema = require('../../modelos/temas');

// Función Menajo Error Controlador
function errorHandler(err, next, item) {
  if (err) return next(err);
  if (!item) {
    const error = new Error('No existe');
    error.statusCode = 500;
    return next(error);
  }
}

// Traer registro de tema por Id
const getId = (req, res, next) => {
  let id = req.params.id;
  ModeloTema.findById(id, (err, item) => {
    if (err || !item) return errorHandler(err, next, item);
    res.json({
      result: true,
      data: item
    });
  });
}

// Traer lista de temas
function listar(req, res, next) {
  ModeloTema.find().exec((err, items) => {
    if (err || !items) return errorHandler(err, next, items);
    res.json({
      result: true,
      data: items
    });
  });
}

// Guardar registro de tema
function guardar(req, res, next) {
  let data = {
    name: req.body.name, descripcion: req.body.descripcion
  }
  let modeloTema = new ModeloTema(data);
  modeloTema.save((err, item) => {
    if (err || !item) return errorHandler(err, next, item);
    res.json({
      result: true,
      data: item
    });
  });
}

// Actualiza un registro de tema por su Id
function actualizar(req, res, next) {
  let id = req.params.id;
  let data = {
    nombre: req.body.nombre
  }
  ModeloTema.findByIdAndUpdate(id, data, { new: true }, (err, item) => {
    if (err || !item) return errorHandler(err, next, item);
    res.json({
      result: true,
      data: item
    })
  });
}

// Elimina tema por Id
function borrarId(req, res, next) {
  let id = req.params.id;
  ModeloTema.findByIdAndRemove(id, (err, item) => {
    if (err || !item) return errorHandler(err, next, item);
    res.json({
      result: true,
      data: item
    })
  });
}

module.exports = {
  getId, listar, guardar, actualizar, borrarId
};

