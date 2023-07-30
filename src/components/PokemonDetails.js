import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonDetails = () => {
  const [pokemonNumber, setPokemonNumber] = useState('');
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonTypes, setPokemonTypes] = useState([]);

  const handleInputChange = (event) => {
    setPokemonNumber(event.target.value);
  };

  useEffect(() => {
    // Function to fetch Pokemon details
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`
        );
        const { name, types } = response.data;
        setPokemonName(name);
        setPokemonTypes(types.map((typeData) => typeData.type.name));
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
        setPokemonName('Pokemon not found');
        setPokemonTypes([]);
      }
    };

    // Check if pokemonNumber is a valid number (e.g., not empty)
    if (pokemonNumber) {
      fetchPokemonDetails();
    } else {
      setPokemonName(''); // Reset the name if the input is empty
      setPokemonTypes([]);
    }
  }, [pokemonNumber]);

  return (
    <div>
      <h2>Pokemon Details</h2>
      <input
        type="number"
        placeholder="Enter Pokemon Number"
        value={pokemonNumber}
        onChange={handleInputChange}
      />
      {pokemonName && <p>Pokemon Name: {pokemonName}</p>}
      {pokemonTypes.length > 0 && (
        <p>Pokemon Type(s): {pokemonTypes.join(', ')}</p>
      )}
    </div>
  );
};

export default PokemonDetails;
