
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const rutasv1 = require('./rutas/v1/');
const app = express();
var cors = require('cors')
require('dotenv').config()

app.use(cors({
    origin: true
}))

app.use(bodyParser.json());
rutasv1(app);

// Middleware para manejo de errores app
app.use((error, req, res, next) => {

    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({
        result: false,
        message: message,
        data: data
    })

});

mongoose.connect(process.env.URL_DB_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('MongoDB Conectado');

    app.listen(process.env.PORT_SERVER, () => {
        console.log('Servidor Uptime');
    })

}).catch((err) => console.log(err));


