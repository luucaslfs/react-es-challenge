import React from 'react';
import PokemonDetails from './components/PokemonDetails';
import PokemonList from './components/PokemonList';

const App = () => {
  return (
    <div>
      <h1>Pokemon App</h1>
      <PokemonDetails />
      { <div style={{ borderTop: '1px solid #ccc', margin: '30px 0' }} /> }
      <PokemonList />
    </div>
  );
};

export default App;
