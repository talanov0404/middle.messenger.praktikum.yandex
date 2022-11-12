const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('./dist/'));

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}!`);
});