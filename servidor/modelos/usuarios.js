const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const usuarios = new Schema({
  name: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    default: 'user',
  },
  genero: {
    type: String,
    require: true
  },
  pais: {
    type: String,
    require: true
  },
  comuna: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  telefono: {
    type: String,
    require: true
  },
  edad: {
    type: Number,
    require: true
  },
  password: {
    type: String,
    required: true
  }
});

const modelo = mongoose.model('usuarios', usuarios);

module.exports = modelo;