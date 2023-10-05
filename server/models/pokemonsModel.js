const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://Wilson:P2M1y1F8LkPuidoT@pokemonproject.l7nypzy.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'pokemon'
})
  .then(() => console.log('Connected to Mongo DB'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  name: String,
  stats: Schema.Types.Mixed,
  types: [String],
  weight: Number,
  move: [String],
  pokedexId: String,
  pictures: {
    non_Shiny: String,
    shiny: String,
    // rarity: String,
  }
});

const Pokemon = mongoose.model('pokemon', pokemonSchema);

module.exports = {
  Pokemon,
};