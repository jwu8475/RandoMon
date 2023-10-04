const fetch = require('node-fetch');
const path = require('path');
const { move } = require('../server');
const pokemonController = {};


pokemonController.getPokemon = async (req, res, next) => {
  const { id } = req.body;
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon data');
    }
    const data = await response.json();
    res.locals.name = data.name;
    res.locals.stats = {};
    res.locals.types = [];
    res.locals.weight = data.weight;
    res.locals.move = data.moves[Math.floor(Math.random() * (data.moves.length))].move;
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
