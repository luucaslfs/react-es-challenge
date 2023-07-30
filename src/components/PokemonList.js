import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await axios.get(
                    'https://pokeapi.co/api/v2/pokemon?limit=20'
                );
                setPokemonList(response.data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Pokemon list:', error);
                setLoading(false);
            }
        };

        fetchPokemonList();
    }, []);

    return (
        <div>
            <h2>Pokemon List</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {pokemonList.map((pokemon, index) => (
                        <li key={index}>{pokemon.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PokemonList;
