const app = require('./src/app')
const port = 3000;

app.listen(port, () => {{}
  console.log(`Servidor escuchando en http://localhost:${port}`);
  console.log("Nombre de la aplicación: ", app.get('name'));
  console.log("La aplicación", app.get('name'), "esta en funcionamiento");
})

