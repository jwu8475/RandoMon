import React, { useEffect, useState } from 'react';

import './PokemonLibrary.css';

const PokemonLibrary = () => {
  const [ pokemonList, setPokemonList ] = useState([]); 

  const quickFetch = async () => {
    const id = Math.floor(Math.random() * 1017) + 1;
    try {
      const response = await fetch(`/api/random-pokemon/?id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon data');
      }
      const data = await response.json();
      data.singleMove = data.move[Math.floor(Math.random() * (data.move.length))];
      console.log(pokemonList);
      setPokemonList([...pokemonList, data]);
    } catch (error) {
      console.error('Error fetching Pokemon data: ', error);
    }
  };

  //   const customPokemon = () => {
  //     const pokemon = {}
    
  //   }

  return (
    <div className="pokemon-library-container">
      <h1 className="pokemon-library-heading">Pokemon Library</h1>
      <button onClick={quickFetch} className="add-random-pokemon-button">
        Add Random Pokemon
      </button>
      <br />
      <button className="add-custom-pokemon-button">Add a Custom Pokemon</button>
      {pokemonList && (
        <div className="pokemon_list">
          {pokemonList.map((pokemon, index) => (
            <p key={index} className="pokemon-item">
              <span className="pokemon-move">{pokemon.name}</span> 
              <span className="pokemon-name">Move: {pokemon.singleMove}</span>
            </p>
          ))}
        </div>
      )}
      <a href="/">Back to Homepage</a>
    </div>
  );
};

export default PokemonLibrary;