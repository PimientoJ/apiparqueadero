const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cors = require("cors");
require('dotenv').config();
const conexion = require('./connection');
const registroRoutes = require('./routes/registroRoutes');


app.use(bodyParser.json());

// settings
// Configura el directorio estático
app.use(express.static(path.join(__dirname, 'src/view')));
app.set("name", "Parqueadero");
app.set("port", process.env.PORT || 3500);

// cors
const whitelist = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  "http://127.0.0.1:8080",
  "http://localhost:8080",
  "http://127.0.0.1:3000/api/parqueadero",
  "https://apiparqueadero-9c5c32fb24d7.herokuapp.com/"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
};


app.use(cors({
  origin: 'http://127.0.0.1:5500', // Reemplaza con tu dominio
  credentials: true // Permite el envío de cookies a través de CORS
}));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'inicio.html'));
});

// app.use((req, res, next) => {
//   if (!req.session.usuario && req.path !== 'iniciosesion.html') {
//     return res.redirect('iniciosesion.html');
//   }
//   next();
// });



app.use(express.static('public'));
app.use('/api/parqueadero', registroRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


module.exports = app;
