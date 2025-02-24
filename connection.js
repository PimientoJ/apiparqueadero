const mysql = require('mysql2');

require('dotenv').config();

// Crear una conexión a la base de datos
const conexion = mysql.createPool({
  host: 'localhost', // Proveer valor por defecto
  database: 'parqueadero',
  user: 'root',
  password: '123456789',
  port: process.env.PORT || 3306,  // Proveer valor por defecto
  
});

// Probar la conexión
conexion.getConnection((err, connection) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conexión a la base de datos exitosa');
    connection.release();
  }
});



module.exports = conexion;