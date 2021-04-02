import React from 'react'

import PokeballSvg from './pokeball-svg'
import PokemonCard from './pokemon-card'

export default function PokemonList({ data, onClickPokemon, isLoading }) {
  return (
    <div
      className="my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12"
      data-testid="cards-wrapper"
    >
      {data.map((poke) => {
        return (
          <PokemonCard
            {...poke}
            key={poke.id}
            onClick={() => onClickPokemon(poke)}
          />
        )
      })}
      {isLoading ? <CardsLoading repeat={3} /> : null}
    </div>
  )
}

export function CardsLoading({ repeat = 4 }) {
  return (
    <>
      {Array(repeat)
        .fill(0)
        .map((_, index) => (
          <div
            className="relative animate-pulse p-3 h-32 bg-gray-50 border-2 border-gray-500 rounded"
            key={index}
          >
            <h3 className="bg-gray-500 bg-opacity-50 h-5 w-14" />
            <PokeballSvg className="absolute bottom-2 right-2 w-16 h-16 text-gray-200" />
          </div>
        ))}
    </>
  )
}
