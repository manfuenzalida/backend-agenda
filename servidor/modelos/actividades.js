const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaActividades = new Schema({
  name: {
    type: String,
    required: true
  },  
  descripcion: {
    type: String,
    default: 'sin descripcion',
  },
  fecha:{
    type: Date,
    required: true
  },
  hora:{
    type: String,
    required: true
  },
  temaId:{
    type: Schema.Types.ObjectId,
    ref: 'temas',
  },
  usuarioId:{
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required:true
  }
});

const modelo = mongoose.model('actividades', schemaActividades );
module.exports = modelo;