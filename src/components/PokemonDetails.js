import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonDetails = () => {
    const [pokemonNumber, setPokemonNumber] = useState('');
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [pokemonSprite, setPokemonSprite] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setPokemonNumber(event.target.value);
    };

    // Function to fetch Pokemon details
    const fetchPokemonDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`
            );
            const { name, types, sprites } = response.data;
            setPokemonName(name);
            setPokemonTypes(types.map((typeData) => typeData.type.name));
            setPokemonSprite(sprites.front_default);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Pokemon details:', error);
            setPokemonName('Pokemon not found');
            setPokemonTypes([]);
            setPokemonSprite('');
            setLoading(false);
        }
    };

    useEffect(() => {
        // Check if pokemonNumber is a valid number (e.g., not empty)
        if (pokemonNumber) {
            fetchPokemonDetails();
        } else {
            setPokemonName(''); // Reset the name if the input is empty
            setPokemonTypes([]);
            setPokemonSprite('');
        }
    }, [pokemonNumber]);

    const handleUpdateClick = () => {
        // Trigger the API request whenever the "Update" button is clicked
        fetchPokemonDetails();
    };

    return (
        <div>
            <h2>Pokemon Details</h2>
            <input
                type="number"
                placeholder="Enter Pokemon Number"
                value={pokemonNumber}
                onChange={handleInputChange}
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {pokemonName && <p>Pokemon Name: {pokemonName}</p>}
                    {pokemonTypes.length > 0 && (
                        <p>Pokemon Type(s): {pokemonTypes.join(', ')}</p>
                    )}
                    {pokemonSprite && (
                        <img
                            src={pokemonSprite}
                            alt={pokemonName}
                            style={{ width: '100px', height: '100px' }}
                        />
                    )}
                </>
            )}
            <button onClick={handleUpdateClick}>Update</button>
        </div>
    );
};

export default PokemonDetails;
