import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
// import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
// import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';

import './CharacterCard.css';

const CharacterCard = () => {
  const [ randomPokemon, setPokemonData ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(null);

  const fetchPokemonData = async () => {
    setIsLoading(true);
    const id = Math.floor(Math.random() * 1017) + 1;
    try {
      const response = await fetch(`/api/random-pokemon/?id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon data');
      }
      const data = await response.json();
      setPokemonData(data);
    } catch (error) {
      console.error('Error fetching Pokemon data: ', error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (randomPokemon === null) {
      fetchPokemonData();
    }
  }, [randomPokemon]);
  return (
    <div>
      <h1>Pokemon Generator</h1>
      <button onClick={fetchPokemonData} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get Random Pokemon'}
      </button>
      { randomPokemon && (
        <article className={`pokemon ${randomPokemon.pictures.rarity}`}>
          <h1>{randomPokemon.name}</h1>
          <h5>Pokdex # {randomPokemon.pokedexId}</h5>
          <img src={randomPokemon.pictures[randomPokemon.pictures.rarity]} alt={randomPokemon.name} />
          <h5>Stats:</h5>
          <ul>
            <li>hp: {randomPokemon.stats.hp}</li>
            <li>attack: {randomPokemon.stats.attack}</li>
            <li>defense: {randomPokemon.stats.defense}</li>
            <li>special attack: {randomPokemon.stats.special_attack}</li>
            <li>special defense: {randomPokemon.stats.special_defense}</li>
            <li>speed: {randomPokemon.stats.speed}</li>
          </ul>
          <p><b>Current Move:</b> <br />{randomPokemon.move[Math.floor(Math.random() * (randomPokemon.move.length))]}</p>
          <p><b>Type:</b> <br />{randomPokemon.types.join(', ')}</p>
        </article>
      )}
      <a href='/PokemonLibrary'>Pokemon Library!</a>
    </div>
  );
};

export default CharacterCard;
