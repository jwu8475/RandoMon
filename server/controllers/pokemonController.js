// const fetch = require('node-fetch');
const path = require('path');
const { move } = require('../server');
const { type } = require('os');
import('node-fetch').then(({ default: fetch }) => {
  // Your code that uses fetch goes here
}).catch(err => {
  console.error('Error importing node-fetch:', err);
});

const pokemonController = {};


pokemonController.getPokemon = async (req, res, next) => {
  const { id } = req.body;
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/1`);
    if (!response) {
      throw new Error('Failed to fetch Pokemon data');
    }
    const data = await response.json();
    
    // sets up pokemon stats
    const allStats = {};
    const statArr = data.stats;
    for (let i = 0;i < statArr.length;i++) {
      allStats[statArr[i].stat.name] = statArr[i].base_stat;
    }

    // sets up pokemon types
    const allTypes = [];
    const typeArr = data.types;
    for (let i = 0;i < typeArr.length;i++) {
      allTypes.push(typeArr[i].type.name);
    }


    res.locals.name = data.name;
    res.locals.stats = allStats;
    res.locals.types = allTypes;
    res.locals.weight = data.weight;
    res.locals.move = data.moves[Math.floor(Math.random() * (data.moves.length))].move;
    res.locals.picture = [ data.sprites.front_default, data.sprites.front_shiny ];

    return next();

  } catch (error) {
    console.error('Error fetching Pokemon data: ', error);
  }
};

// pokemonController.getNewMove = (req, res, next) => {

// }

// pokemonController.createPokemon = (req, res, next) => {
    
// }

// pokemonController.updatePokemon = (req, res, next) => {

// }

// pokemonController.deletePokemon = (req, res, next) => {

// }

module.exports = pokemonController;
