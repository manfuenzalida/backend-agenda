const ModeloActividad = require('../../modelos/actividades');
const temas = require('../../modelos/temas');

// Funcion manejo error controlador
function errorHandler(err, next, item) {
  if (err) return next(err);
  if (!item) {
    const error = new Error('No existe');
    error.statusCode = 500;
    return next(error);
  }
}

// Traer registro actividad por ID 
const getId = (req, res, next) => {
  let id = req.params.id;
  ModeloActividad.findById(id, (err, item) => {
    if (err || !item) return errorHandler(err, next, item);
    res.json({
      result: true,
      data: item
    });
  });
}

// Traer registros de actividad por su fecha
const getActividadbyFecha = (req, res, next) => {
  let fecha = req.params.fecha;
  ModeloActividad.find({ "fecha": fecha })
    .exec((err, item) => {
      if (err || !item) return errorHandler(err, next, item);
      res.json({
        result: true,
        data: item
      });
    });
}

// Traer todas las actividades
function listar(req, res, next) {
  ModeloActividad.find().exec((err, items) => {
    if (err || !items) return errorHandler(err, next, items);
    res.json({
      result: true,
      data: items
    });
  });
}

// Traer lista de actividades por usuarioId 
function listarOnlyUser(req, res, next) {
  let idUser = req.params.idUser;
  ModeloActividad.find({ "usuarioId": idUser }).exec((err, items) => {
    if (err || !items) return errorHandler(err, next, items);
    res.json({
      result: true,
      data: items
    });
  });
}

// Guardar registro de actividad
function guardar(req, res, next) {
  console.log("Guardar Actividad")
  let usuario = req.usuario;
  let data = {
    name: req.body.name,
    descripcion: req.body.descripcion,
    fecha: req.body.fecha,
    hora: req.body.hora,
    temaId: req.body.idTema,
    usuarioId: usuario.usuarioId
  }
  let modeloActividad = new ModeloActividad(data);
  modeloActividad.save((err, item) => {
    if (err || !item) return errorHandler(err, next, item);
    res.json({
      result: true,
      data: item
    });
  });
}

// Actualizar Actividad por Id
function actualizar(req, res, next) {
  let id = req.params.id;
  let data = {
    descripcion: req.body.descripcion
  }
  ModeloActividad.findByIdAndUpdate(id, data, { new: true }, (err, item) => {
    if (err || !item) return errorHandler(err, next, item);
    res.json({
      result: true,
      data: item
    })
  });
}

// Eliminar registro de Actividad por Id
function borrarId(req, res, next) {
  let id = req.params.id;
  ModeloActividad.findByIdAndRemove(id, (err, item) => {
    if (err || !item) return errorHandler(err, next, item);
    res.json({
      result: true,
      data: item
    })
  });
}
module.exports = {
  listarOnlyUser, getId, listar, guardar, actualizar, borrarId, getActividadbyFecha,
};

