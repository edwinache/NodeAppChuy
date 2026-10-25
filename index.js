const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('¡Hola desde Node.js corriendo en Docker y Portainer!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});