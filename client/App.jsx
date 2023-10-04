import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import CharacterCard from './components/CharacterCard';


export default function App() {
  return (
    <div className="App">
      <h1>Pokemon Generator</h1>
      <CharacterCard />
    </div>
  );
}