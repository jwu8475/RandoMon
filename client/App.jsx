import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';

import CharacterCard from './components/CharacterCard';
import PokemonLibrary from './libraryComponents/PokemonLibrary';

export default function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path='/' element={<CharacterCard />} />
          <Route path='/PokemonLibrary' element={<PokemonLibrary />}/>
        </Routes>
      </main>
    </div>
  );
}