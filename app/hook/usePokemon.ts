"use client"

import { useState, useEffect } from 'react';

interface Pokemon {
 
  image: string;
}

const usePokemon = (count: number): Pokemon[] => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const promises = Array.from({ length: count }, (_, i) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`).then((res) => res.json())
      );

     const results = await Promise.all(promises)

      const formattedData = results.map((pokemon: any) => ({
        id: pokemon.id,
        image: pokemon.sprites.front_default,
      }));


      setPokemons([...formattedData, ...formattedData]);
    };

    fetchPokemons();
  }, [count]);

  return pokemons;
};

export default usePokemon;