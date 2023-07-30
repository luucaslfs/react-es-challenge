import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    'https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}'
                );
                const newPokemonList = response.data.results;
                setPokemonList((prevList) => [...prevList, ...newPokemonList]);
                setLoading(false);
                setHasMore(newPokemonList.length > 0); // Check if there are more Pokemon to be fetched
            } catch (error) {
                console.error('Error fetching Pokemon list:', error);
                setLoading(false);
            }
        };

        fetchPokemonList();
    }, [offset]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            if (!loading && hasMore) {
                setOffset((prevOffset) => prevOffset + 20);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, hasMore]);

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
