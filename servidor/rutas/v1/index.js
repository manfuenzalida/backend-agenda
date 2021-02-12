const temaRutas = require('./tema');
const usuarioRutas = require('./usuario');
const loginRutas = require('./login');
const actividadRutas = require('./actividad');
module.exports = (app) => {
  app.use('/api/v1', temaRutas);
  app.use('/api/v1', usuarioRutas);
  app.use('/api/v1', loginRutas);
  app.use('/api/v1', actividadRutas);
}