import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
// import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
// import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';

const CharacterCard = () => {
  const [ randomPokemon, setPokemonData ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(null);

  const fetchPokemonData = async () => {
    setIsLoading(true);
    const id = Math.floor(Math.random() * 1017) + 1;
    try {
      const response = await fetch('/api/random-pokemon');
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

  const shinyPokemon = () => {
    const shinyChance = 5; // 5%
    if (Math.floor(Math.random() * 100) < shinyChance) return randomPokemon.sprites.front_shiny;
    return randomPokemon.sprites.front_default;
  };

  return (
    <div>
      <h1>Random POKEMON</h1>
      <button onClick={fetchPokemonData} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get Random Pokemon'}
      </button>
      <article className="pokemon">
        <h1>{randomPokemon.name}</h1>
        <img src={shinyPokemon} alt={randomPokemon.name} />
        <h2>Stats:</h2>
        {/* <ul>

        </ul> */}
      </article>
    </div>
  );
};

export default CharacterCard;
