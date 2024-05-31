const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos desde la carpeta 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Manejar cualquier ruta y servir el archivo de entrada de la aplicación Vue.js
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto ${PORT}");
});