"use client"
import { useState, useEffect } from 'react';
import usePokemon from '../hook/usePokemon';

interface Card {
  id: number;

  image: string;
}

const shuffleArray = (array: Card[]): Card[] => {
  return array.sort(() => Math.random() - 0.5);
};

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [clickCount, setClickCount] = useState<number>(0); 
  const [matchAttemptCount, setMatchAttemptCount] = useState<number>(0); 
  const [disableClick, setDisableClick] = useState<boolean>(false); 

  const pokemons = usePokemon(4); 

  useEffect(() => {
    if (pokemons.length) {
      setCards(shuffleArray(pokemons));
    }
  }, [pokemons]);

  const handleCardClick = (index: number) => {
 
    if (disableClick || matchedCards.includes(index)) return;


    if (flippedCards.includes(index)) {
      setFlippedCards((prev) => prev.filter((i) => i !== index));
      return;
    }


    setClickCount(prevCount => prevCount + 1);

    
    if (flippedCards.length === 2) return;

    setFlippedCards((prev) => [...prev, index]);


    if (flippedCards.length === 1) {
      setDisableClick(true); 

      const firstIndex = flippedCards[0];
      const secondIndex = index;


      setMatchAttemptCount(prevCount => prevCount + 1);


      if (cards[firstIndex].id === cards[secondIndex].id) {
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
      }

    
      setTimeout(() => {
        setFlippedCards([]);
        setDisableClick(false); 
      }, 1000);
    }
  };

  const isFlipped = (index: number) => flippedCards.includes(index) || matchedCards.includes(index);

  return (
    <div className="flex flex-col items-center">
      <div className="text-lg font-bold mb-4">Clicks: {clickCount}</div>
      <div className="text-lg font-bold mb-4">Match Actions tries: {matchAttemptCount}</div> 
      <div className="grid grid-cols-4 gap-4 p-4">
        {cards.map((pokemon, index) => (
          <div
            key={index}
            className={`relative w-24 h-32 cursor-pointer bg-gray-200 shadow-lg transform transition-transform duration-300 ${
              isFlipped(index) ? 'rotate-y-180' : ''
            }`}
            onClick={() => handleCardClick(index)}
          >
            <div
              className={`absolute inset-0 flex justify-center items-center bg-white backface-hidden transition-opacity duration-700 ease-in-out ${
                isFlipped(index) ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="w-full h-full bg-gray-500"></div>
            </div>
            <div
              className={`absolute inset-0 flex justify-center items-center transform rotate-y-180  transition-opacity duration-700 ease-in-out ${
                isFlipped(index) ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src={pokemon.image}  className="w-full h-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;