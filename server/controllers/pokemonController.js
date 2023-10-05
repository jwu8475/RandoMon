const path = require('path');
const { move } = require('../server');
const { type } = require('os');
import('node-fetch').then(({ default: fetch }) => {
  // Your code that uses fetch goes here
}).catch(err => {
  console.error('Error importing node-fetch:', err);
});

const { Pokemon } = require('../models/pokemonsModel');

const pokemonController = {};


pokemonController.getPokemon = async (req, res, next) => {
  const { id } = req.query;

  // checks db
  //   const dbData = await Pokemon.find({pokedexId: id});
  //   if (dbData) {
  //     res.locals = dbData;
  //     return next();
  //   }

  try {
    // fetches from pokemon api
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response) {
      throw new Error('Failed to fetch Pokemon data');
    }
    const data = await response.json();


    // creates move set
    const moveList = [];
    for (let i = 0;i < data.moves.length;i++) {
      moveList.push(data.moves[i].move.name);
    }

    // sets up pokemon stats
    const allStats = {};
    const statArr = data.stats;
    for (let i = 0;i < statArr.length;i++) {
      allStats[statArr[i].stat.name.replace('-', '_')] = statArr[i].base_stat;
    }

    // sets up pokemon types
    const allTypes = [];
    const typeArr = data.types;
    for (let i = 0;i < typeArr.length;i++) {
      allTypes.push(typeArr[i].type.name);
    }

    // decides shiny
    const shinyPokemon = () => {
      const shinyChance = 20; // 5%
      if (Math.floor(Math.random() * 100) < shinyChance) {
        if(data.sprites.front_shiny) {
          return 'shiny';
        }
      }
      return 'non_shiny';
    };

    // shiny or not
    // const rarity = shinyPokemon()

    // storing into our db
    // const newPokemon = new Pokemon({
    //   name: data.name,
    //   stats: allStats,
    //   types: allTypes,
    //   weight: data.weight,
    //   move: moveList,
    //   pokedexId: id,
    //   pictures: { 
    //     non_shiny: data.sprites.front_default, 
    //     shiny: data.sprites.front_shiny,
    //   }
    // });

    // newPokemon.save();

    res.locals.name = data.name;
    res.locals.stats = allStats;
    res.locals.types = allTypes;
    res.locals.weight = data.weight;
    res.locals.move = moveList;
    res.locals.pokedexId = id;
    res.locals.pictures = { 
      non_shiny: data.sprites.front_default, 
      shiny: data.sprites.front_shiny,
      rarity: shinyPokemon()
    };

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
