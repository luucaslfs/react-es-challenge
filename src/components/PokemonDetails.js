import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonDetails = () => {
    const [pokemonNumber, setPokemonNumber] = useState('');
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonTypes, setPokemonTypes] = useState([]);
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
            const { name, types } = response.data;
            setPokemonName(name);
            setPokemonTypes(types.map((typeData) => typeData.type.name));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Pokemon details:', error);
            setPokemonName('Pokemon not found');
            setPokemonTypes([]);
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
                </>
            )}
            <button onClick={handleUpdateClick}>Update</button>
        </div>
    );
};

export default PokemonDetails;
