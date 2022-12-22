const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./dist/'));

app.use("*", (_req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}!`);
});
