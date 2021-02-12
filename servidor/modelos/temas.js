const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaTemas = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  descripcion: {
    type: String,
    required: true
  }

});

const modelo = mongoose.model('temas', schemaTemas);

module.exports = modelo;