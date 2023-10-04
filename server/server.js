const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

const pokemonController = require('./controllers/pokemonController');

app.use(express.json());

app.get('/api/random-pokemon', pokemonController.getPokemon, (req, res) => {
  return res.status(200).json(res.locals);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});
  
// app.use('/assets', express.static(path.resolve(__dirname, '../client')))
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;