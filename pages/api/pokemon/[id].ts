import type { NextApiRequest, NextApiResponse } from 'next'

import { getPokemonWithId } from 'utils/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  res.status(200).json(await getPokemonWithId(id))
  // res.status(200).json(
  //   JSON.stringify({
  //     id: '1',
  //     name: 'bulbasaur',
  //     order: 1,
  //     default_image:
  //       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
  //     types: [
  //       {
  //         slot: 1,
  //         type: {
  //           name: 'grass',
  //           url: 'https://pokeapi.co/api/v2/type/12/',
  //         },
  //       },
  //       {
  //         slot: 2,
  //         type: {
  //           name: 'poison',
  //           url: 'https://pokeapi.co/api/v2/type/4/',
  //         },
  //       },
  //     ],
  //     stats: [
  //       {
  //         base_stat: 45,
  //         effort: 0,
  //         stat: {
  //           name: 'hp',
  //           url: 'https://pokeapi.co/api/v2/stat/1/',
  //         },
  //       },
  //       {
  //         base_stat: 49,
  //         effort: 0,
  //         stat: {
  //           name: 'attack',
  //           url: 'https://pokeapi.co/api/v2/stat/2/',
  //         },
  //       },
  //       {
  //         base_stat: 49,
  //         effort: 0,
  //         stat: {
  //           name: 'defense',
  //           url: 'https://pokeapi.co/api/v2/stat/3/',
  //         },
  //       },
  //       {
  //         base_stat: 65,
  //         effort: 1,
  //         stat: {
  //           name: 'special-attack',
  //           url: 'https://pokeapi.co/api/v2/stat/4/',
  //         },
  //       },
  //       {
  //         base_stat: 65,
  //         effort: 0,
  //         stat: {
  //           name: 'special-defense',
  //           url: 'https://pokeapi.co/api/v2/stat/5/',
  //         },
  //       },
  //       {
  //         base_stat: 45,
  //         effort: 0,
  //         stat: {
  //           name: 'speed',
  //           url: 'https://pokeapi.co/api/v2/stat/6/',
  //         },
  //       },
  //     ],
  //     url: 'https://pokeapi.co/api/v2/pokemon/1/',
  //     color: 'green',
  //   }),
  // )
}
