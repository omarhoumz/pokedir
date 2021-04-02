import type { NextApiRequest, NextApiResponse } from 'next'

import { getPokemon } from 'utils/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const params = new URLSearchParams(
    req.query as Record<string, string>,
  ).toString()

  let pokeData = null
  try {
    const url = `https://pokeapi.co/api/v2/pokemon?${params}`
    pokeData = await (await fetch(url)).json()
  } catch (error) {
    console.error(error)
    res.status(500).json({ code: -1, message: 'Error while fetching data' })
    return
  }

  let allData = null
  try {
    allData = await Promise.all(
      pokeData.results.map(async ({ url }) => await getPokemon(url)),
    )
  } catch (error) {
    console.error(error)
    res.status(500).json({ code: -1, message: 'Error while fetching data' })
    return
  }

  pokeData.results = allData

  res.status(200).json(pokeData)
  // res.status(200).json(
  //   JSON.stringify({
  //     count: 1118,
  //     next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  //     previous: null,
  //     results: [
  //       {
  //         id: 1,
  //         name: 'bulbasaur',
  //         order: 1,
  //         default_image:
  //           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
  //         types: [
  //           {
  //             slot: 1,
  //             type: {
  //               name: 'grass',
  //               url: 'https://pokeapi.co/api/v2/type/12/',
  //             },
  //           },
  //           {
  //             slot: 2,
  //             type: {
  //               name: 'poison',
  //               url: 'https://pokeapi.co/api/v2/type/4/',
  //             },
  //           },
  //         ],
  //         stats: [
  //           {
  //             base_stat: 45,
  //             effort: 0,
  //             stat: {
  //               name: 'hp',
  //               url: 'https://pokeapi.co/api/v2/stat/1/',
  //             },
  //           },
  //           {
  //             base_stat: 49,
  //             effort: 0,
  //             stat: {
  //               name: 'attack',
  //               url: 'https://pokeapi.co/api/v2/stat/2/',
  //             },
  //           },
  //           {
  //             base_stat: 49,
  //             effort: 0,
  //             stat: {
  //               name: 'defense',
  //               url: 'https://pokeapi.co/api/v2/stat/3/',
  //             },
  //           },
  //           {
  //             base_stat: 65,
  //             effort: 1,
  //             stat: {
  //               name: 'special-attack',
  //               url: 'https://pokeapi.co/api/v2/stat/4/',
  //             },
  //           },
  //           {
  //             base_stat: 65,
  //             effort: 0,
  //             stat: {
  //               name: 'special-defense',
  //               url: 'https://pokeapi.co/api/v2/stat/5/',
  //             },
  //           },
  //           {
  //             base_stat: 45,
  //             effort: 0,
  //             stat: {
  //               name: 'speed',
  //               url: 'https://pokeapi.co/api/v2/stat/6/',
  //             },
  //           },
  //         ],
  //         url: 'https://pokeapi.co/api/v2/pokemon/1/',
  //         color: 'green',
  //       },
  //       {
  //         id: 2,
  //         name: 'ivysaur',
  //         order: 2,
  //         default_image:
  //           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg',
  //         types: [
  //           {
  //             slot: 1,
  //             type: {
  //               name: 'grass',
  //               url: 'https://pokeapi.co/api/v2/type/12/',
  //             },
  //           },
  //           {
  //             slot: 2,
  //             type: {
  //               name: 'poison',
  //               url: 'https://pokeapi.co/api/v2/type/4/',
  //             },
  //           },
  //         ],
  //         stats: [
  //           {
  //             base_stat: 60,
  //             effort: 0,
  //             stat: {
  //               name: 'hp',
  //               url: 'https://pokeapi.co/api/v2/stat/1/',
  //             },
  //           },
  //           {
  //             base_stat: 62,
  //             effort: 0,
  //             stat: {
  //               name: 'attack',
  //               url: 'https://pokeapi.co/api/v2/stat/2/',
  //             },
  //           },
  //           {
  //             base_stat: 63,
  //             effort: 0,
  //             stat: {
  //               name: 'defense',
  //               url: 'https://pokeapi.co/api/v2/stat/3/',
  //             },
  //           },
  //           {
  //             base_stat: 80,
  //             effort: 1,
  //             stat: {
  //               name: 'special-attack',
  //               url: 'https://pokeapi.co/api/v2/stat/4/',
  //             },
  //           },
  //           {
  //             base_stat: 80,
  //             effort: 1,
  //             stat: {
  //               name: 'special-defense',
  //               url: 'https://pokeapi.co/api/v2/stat/5/',
  //             },
  //           },
  //           {
  //             base_stat: 60,
  //             effort: 0,
  //             stat: {
  //               name: 'speed',
  //               url: 'https://pokeapi.co/api/v2/stat/6/',
  //             },
  //           },
  //         ],
  //         url: 'https://pokeapi.co/api/v2/pokemon/2/',
  //         color: 'green',
  //       },
  //       {
  //         id: 3,
  //         name: 'venusaur',
  //         order: 3,
  //         default_image:
  //           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg',
  //         types: [
  //           {
  //             slot: 1,
  //             type: {
  //               name: 'grass',
  //               url: 'https://pokeapi.co/api/v2/type/12/',
  //             },
  //           },
  //           {
  //             slot: 2,
  //             type: {
  //               name: 'poison',
  //               url: 'https://pokeapi.co/api/v2/type/4/',
  //             },
  //           },
  //         ],
  //         stats: [
  //           {
  //             base_stat: 80,
  //             effort: 0,
  //             stat: {
  //               name: 'hp',
  //               url: 'https://pokeapi.co/api/v2/stat/1/',
  //             },
  //           },
  //           {
  //             base_stat: 82,
  //             effort: 0,
  //             stat: {
  //               name: 'attack',
  //               url: 'https://pokeapi.co/api/v2/stat/2/',
  //             },
  //           },
  //           {
  //             base_stat: 83,
  //             effort: 0,
  //             stat: {
  //               name: 'defense',
  //               url: 'https://pokeapi.co/api/v2/stat/3/',
  //             },
  //           },
  //           {
  //             base_stat: 100,
  //             effort: 2,
  //             stat: {
  //               name: 'special-attack',
  //               url: 'https://pokeapi.co/api/v2/stat/4/',
  //             },
  //           },
  //           {
  //             base_stat: 100,
  //             effort: 1,
  //             stat: {
  //               name: 'special-defense',
  //               url: 'https://pokeapi.co/api/v2/stat/5/',
  //             },
  //           },
  //           {
  //             base_stat: 80,
  //             effort: 0,
  //             stat: {
  //               name: 'speed',
  //               url: 'https://pokeapi.co/api/v2/stat/6/',
  //             },
  //           },
  //         ],
  //         url: 'https://pokeapi.co/api/v2/pokemon/3/',
  //         color: 'green',
  //       },
  //       {
  //         id: 4,
  //         name: 'charmander',
  //         order: 5,
  //         default_image:
  //           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg',
  //         types: [
  //           {
  //             slot: 1,
  //             type: {
  //               name: 'fire',
  //               url: 'https://pokeapi.co/api/v2/type/10/',
  //             },
  //           },
  //         ],
  //         stats: [
  //           {
  //             base_stat: 39,
  //             effort: 0,
  //             stat: {
  //               name: 'hp',
  //               url: 'https://pokeapi.co/api/v2/stat/1/',
  //             },
  //           },
  //           {
  //             base_stat: 52,
  //             effort: 0,
  //             stat: {
  //               name: 'attack',
  //               url: 'https://pokeapi.co/api/v2/stat/2/',
  //             },
  //           },
  //           {
  //             base_stat: 43,
  //             effort: 0,
  //             stat: {
  //               name: 'defense',
  //               url: 'https://pokeapi.co/api/v2/stat/3/',
  //             },
  //           },
  //           {
  //             base_stat: 60,
  //             effort: 0,
  //             stat: {
  //               name: 'special-attack',
  //               url: 'https://pokeapi.co/api/v2/stat/4/',
  //             },
  //           },
  //           {
  //             base_stat: 50,
  //             effort: 0,
  //             stat: {
  //               name: 'special-defense',
  //               url: 'https://pokeapi.co/api/v2/stat/5/',
  //             },
  //           },
  //           {
  //             base_stat: 65,
  //             effort: 1,
  //             stat: {
  //               name: 'speed',
  //               url: 'https://pokeapi.co/api/v2/stat/6/',
  //             },
  //           },
  //         ],
  //         url: 'https://pokeapi.co/api/v2/pokemon/4/',
  //         color: 'red',
  //       },
  //       {
  //         id: 5,
  //         name: 'charmeleon',
  //         order: 6,
  //         default_image:
  //           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/5.svg',
  //         types: [
  //           {
  //             slot: 1,
  //             type: {
  //               name: 'fire',
  //               url: 'https://pokeapi.co/api/v2/type/10/',
  //             },
  //           },
  //         ],
  //         stats: [
  //           {
  //             base_stat: 58,
  //             effort: 0,
  //             stat: {
  //               name: 'hp',
  //               url: 'https://pokeapi.co/api/v2/stat/1/',
  //             },
  //           },
  //           {
  //             base_stat: 64,
  //             effort: 0,
  //             stat: {
  //               name: 'attack',
  //               url: 'https://pokeapi.co/api/v2/stat/2/',
  //             },
  //           },
  //           {
  //             base_stat: 58,
  //             effort: 0,
  //             stat: {
  //               name: 'defense',
  //               url: 'https://pokeapi.co/api/v2/stat/3/',
  //             },
  //           },
  //           {
  //             base_stat: 80,
  //             effort: 1,
  //             stat: {
  //               name: 'special-attack',
  //               url: 'https://pokeapi.co/api/v2/stat/4/',
  //             },
  //           },
  //           {
  //             base_stat: 65,
  //             effort: 0,
  //             stat: {
  //               name: 'special-defense',
  //               url: 'https://pokeapi.co/api/v2/stat/5/',
  //             },
  //           },
  //           {
  //             base_stat: 80,
  //             effort: 1,
  //             stat: {
  //               name: 'speed',
  //               url: 'https://pokeapi.co/api/v2/stat/6/',
  //             },
  //           },
  //         ],
  //         url: 'https://pokeapi.co/api/v2/pokemon/5/',
  //         color: 'red',
  //       },
  //       {
  //         id: 6,
  //         name: 'charizard',
  //         order: 7,
  //         default_image:
  //           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg',
  //         types: [
  //           {
  //             slot: 1,
  //             type: {
  //               name: 'fire',
  //               url: 'https://pokeapi.co/api/v2/type/10/',
  //             },
  //           },
  //           {
  //             slot: 2,
  //             type: {
  //               name: 'flying',
  //               url: 'https://pokeapi.co/api/v2/type/3/',
  //             },
  //           },
  //         ],
  //         stats: [
  //           {
  //             base_stat: 78,
  //             effort: 0,
  //             stat: {
  //               name: 'hp',
  //               url: 'https://pokeapi.co/api/v2/stat/1/',
  //             },
  //           },
  //           {
  //             base_stat: 84,
  //             effort: 0,
  //             stat: {
  //               name: 'attack',
  //               url: 'https://pokeapi.co/api/v2/stat/2/',
  //             },
  //           },
  //           {
  //             base_stat: 78,
  //             effort: 0,
  //             stat: {
  //               name: 'defense',
  //               url: 'https://pokeapi.co/api/v2/stat/3/',
  //             },
  //           },
  //           {
  //             base_stat: 109,
  //             effort: 3,
  //             stat: {
  //               name: 'special-attack',
  //               url: 'https://pokeapi.co/api/v2/stat/4/',
  //             },
  //           },
  //           {
  //             base_stat: 85,
  //             effort: 0,
  //             stat: {
  //               name: 'special-defense',
  //               url: 'https://pokeapi.co/api/v2/stat/5/',
  //             },
  //           },
  //           {
  //             base_stat: 100,
  //             effort: 0,
  //             stat: {
  //               name: 'speed',
  //               url: 'https://pokeapi.co/api/v2/stat/6/',
  //             },
  //           },
  //         ],
  //         url: 'https://pokeapi.co/api/v2/pokemon/6/',
  //         color: 'red',
  //       },
  //       {
  //         id: 7,
  //         name: 'squirtle',
  //         order: 10,
  //         default_image:
  //           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg',
  //         types: [
  //           {
  //             slot: 1,
  //             type: {
  //               name: 'water',
  //               url: 'https://pokeapi.co/api/v2/type/11/',
  //             },
  //           },
  //         ],
  //         stats: [
  //           {
  //             base_stat: 44,
  //             effort: 0,
  //             stat: {
  //               name: 'hp',
  //               url: 'https://pokeapi.co/api/v2/stat/1/',
  //             },
  //           },
  //           {
  //             base_stat: 48,
  //             effort: 0,
  //             stat: {
  //               name: 'attack',
  //               url: 'https://pokeapi.co/api/v2/stat/2/',
  //             },
  //           },
  //           {
  //             base_stat: 65,
  //             effort: 1,
  //             stat: {
  //               name: 'defense',
  //               url: 'https://pokeapi.co/api/v2/stat/3/',
  //             },
  //           },
  //           {
  //             base_stat: 50,
  //             effort: 0,
  //             stat: {
  //               name: 'special-attack',
  //               url: 'https://pokeapi.co/api/v2/stat/4/',
  //             },
  //           },
  //           {
  //             base_stat: 64,
  //             effort: 0,
  //             stat: {
  //               name: 'special-defense',
  //               url: 'https://pokeapi.co/api/v2/stat/5/',
  //             },
  //           },
  //           {
  //             base_stat: 43,
  //             effort: 0,
  //             stat: {
  //               name: 'speed',
  //               url: 'https://pokeapi.co/api/v2/stat/6/',
  //             },
  //           },
  //         ],
  //         url: 'https://pokeapi.co/api/v2/pokemon/7/',
  //         color: 'blue',
  //       },
  //       {
  //         id: 8,
  //         name: 'wartortle',
  //         order: 11,
  //         default_image:
  //           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/8.svg',
  //         types: [
  //           {
  //             slot: 1,
  //             type: {
  //               name: 'water',
  //               url: 'https://pokeapi.co/api/v2/type/11/',
  //             },
  //           },
  //         ],
  //         stats: [
  //           {
  //             base_stat: 59,
  //             effort: 0,
  //             stat: {
  //               name: 'hp',
  //               url: 'https://pokeapi.co/api/v2/stat/1/',
  //             },
  //           },
  //           {
  //             base_stat: 63,
  //             effort: 0,
  //             stat: {
  //               name: 'attack',
  //               url: 'https://pokeapi.co/api/v2/stat/2/',
  //             },
  //           },
  //           {
  //             base_stat: 80,
  //             effort: 1,
  //             stat: {
  //               name: 'defense',
  //               url: 'https://pokeapi.co/api/v2/stat/3/',
  //             },
  //           },
  //           {
  //             base_stat: 65,
  //             effort: 0,
  //             stat: {
  //               name: 'special-attack',
  //               url: 'https://pokeapi.co/api/v2/stat/4/',
  //             },
  //           },
  //           {
  //             base_stat: 80,
  //             effort: 1,
  //             stat: {
  //               name: 'special-defense',
  //               url: 'https://pokeapi.co/api/v2/stat/5/',
  //             },
  //           },
  //           {
  //             base_stat: 58,
  //             effort: 0,
  //             stat: {
  //               name: 'speed',
  //               url: 'https://pokeapi.co/api/v2/stat/6/',
  //             },
  //           },
  //         ],
  //         url: 'https://pokeapi.co/api/v2/pokemon/8/',
  //         color: 'blue',
  //       },
  //       {
  //         id: 9,
  //         name: 'blastoise',
  //         order: 12,
  //         default_image:
  //           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/9.svg',
  //         types: [
  //           {
  //             slot: 1,
  //             type: {
  //               name: 'water',
  //               url: 'https://pokeapi.co/api/v2/type/11/',
  //             },
  //           },
  //         ],
  //         stats: [
  //           {
  //             base_stat: 79,
  //             effort: 0,
  //             stat: {
  //               name: 'hp',
  //               url: 'https://pokeapi.co/api/v2/stat/1/',
  //             },
  //           },
  //           {
  //             base_stat: 83,
  //             effort: 0,
  //             stat: {
  //               name: 'attack',
  //               url: 'https://pokeapi.co/api/v2/stat/2/',
  //             },
  //           },
  //           {
  //             base_stat: 100,
  //             effort: 0,
  //             stat: {
  //               name: 'defense',
  //               url: 'https://pokeapi.co/api/v2/stat/3/',
  //             },
  //           },
  //           {
  //             base_stat: 85,
  //             effort: 0,
  //             stat: {
  //               name: 'special-attack',
  //               url: 'https://pokeapi.co/api/v2/stat/4/',
  //             },
  //           },
  //           {
  //             base_stat: 105,
  //             effort: 3,
  //             stat: {
  //               name: 'special-defense',
  //               url: 'https://pokeapi.co/api/v2/stat/5/',
  //             },
  //           },
  //           {
  //             base_stat: 78,
  //             effort: 0,
  //             stat: {
  //               name: 'speed',
  //               url: 'https://pokeapi.co/api/v2/stat/6/',
  //             },
  //           },
  //         ],
  //         url: 'https://pokeapi.co/api/v2/pokemon/9/',
  //         color: 'blue',
  //       },
  //       {
  //         id: 10,
  //         name: 'caterpie',
  //         order: 14,
  //         default_image:
  //           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/10.svg',
  //         types: [
  //           {
  //             slot: 1,
  //             type: {
  //               name: 'bug',
  //               url: 'https://pokeapi.co/api/v2/type/7/',
  //             },
  //           },
  //         ],
  //         stats: [
  //           {
  //             base_stat: 45,
  //             effort: 1,
  //             stat: {
  //               name: 'hp',
  //               url: 'https://pokeapi.co/api/v2/stat/1/',
  //             },
  //           },
  //           {
  //             base_stat: 30,
  //             effort: 0,
  //             stat: {
  //               name: 'attack',
  //               url: 'https://pokeapi.co/api/v2/stat/2/',
  //             },
  //           },
  //           {
  //             base_stat: 35,
  //             effort: 0,
  //             stat: {
  //               name: 'defense',
  //               url: 'https://pokeapi.co/api/v2/stat/3/',
  //             },
  //           },
  //           {
  //             base_stat: 20,
  //             effort: 0,
  //             stat: {
  //               name: 'special-attack',
  //               url: 'https://pokeapi.co/api/v2/stat/4/',
  //             },
  //           },
  //           {
  //             base_stat: 20,
  //             effort: 0,
  //             stat: {
  //               name: 'special-defense',
  //               url: 'https://pokeapi.co/api/v2/stat/5/',
  //             },
  //           },
  //           {
  //             base_stat: 45,
  //             effort: 0,
  //             stat: {
  //               name: 'speed',
  //               url: 'https://pokeapi.co/api/v2/stat/6/',
  //             },
  //           },
  //         ],
  //         url: 'https://pokeapi.co/api/v2/pokemon/10/',
  //         color: 'green',
  //       },
  //       {
  //         id: 11,
  //         name: 'metapod',
  //         order: 15,
  //         default_image:
  //           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/11.svg',
  //         types: [
  //           {
  //             slot: 1,
  //             type: {
  //               name: 'bug',
  //               url: 'https://pokeapi.co/api/v2/type/7/',
  //             },
  //           },
  //         ],
  //         stats: [
  //           {
  //             base_stat: 50,
  //             effort: 0,
  //             stat: {
  //               name: 'hp',
  //               url: 'https://pokeapi.co/api/v2/stat/1/',
  //             },
  //           },
  //           {
  //             base_stat: 20,
  //             effort: 0,
  //             stat: {
  //               name: 'attack',
  //               url: 'https://pokeapi.co/api/v2/stat/2/',
  //             },
  //           },
  //           {
  //             base_stat: 55,
  //             effort: 2,
  //             stat: {
  //               name: 'defense',
  //               url: 'https://pokeapi.co/api/v2/stat/3/',
  //             },
  //           },
  //           {
  //             base_stat: 25,
  //             effort: 0,
  //             stat: {
  //               name: 'special-attack',
  //               url: 'https://pokeapi.co/api/v2/stat/4/',
  //             },
  //           },
  //           {
  //             base_stat: 25,
  //             effort: 0,
  //             stat: {
  //               name: 'special-defense',
  //               url: 'https://pokeapi.co/api/v2/stat/5/',
  //             },
  //           },
  //           {
  //             base_stat: 30,
  //             effort: 0,
  //             stat: {
  //               name: 'speed',
  //               url: 'https://pokeapi.co/api/v2/stat/6/',
  //             },
  //           },
  //         ],
  //         url: 'https://pokeapi.co/api/v2/pokemon/11/',
  //         color: 'green',
  //       },
  //       {
  //         id: 12,
  //         name: 'butterfree',
  //         order: 16,
  //         default_image:
  //           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/12.svg',
  //         types: [
  //           {
  //             slot: 1,
  //             type: {
  //               name: 'bug',
  //               url: 'https://pokeapi.co/api/v2/type/7/',
  //             },
  //           },
  //           {
  //             slot: 2,
  //             type: {
  //               name: 'flying',
  //               url: 'https://pokeapi.co/api/v2/type/3/',
  //             },
  //           },
  //         ],
  //         stats: [
  //           {
  //             base_stat: 60,
  //             effort: 0,
  //             stat: {
  //               name: 'hp',
  //               url: 'https://pokeapi.co/api/v2/stat/1/',
  //             },
  //           },
  //           {
  //             base_stat: 45,
  //             effort: 0,
  //             stat: {
  //               name: 'attack',
  //               url: 'https://pokeapi.co/api/v2/stat/2/',
  //             },
  //           },
  //           {
  //             base_stat: 50,
  //             effort: 0,
  //             stat: {
  //               name: 'defense',
  //               url: 'https://pokeapi.co/api/v2/stat/3/',
  //             },
  //           },
  //           {
  //             base_stat: 90,
  //             effort: 2,
  //             stat: {
  //               name: 'special-attack',
  //               url: 'https://pokeapi.co/api/v2/stat/4/',
  //             },
  //           },
  //           {
  //             base_stat: 80,
  //             effort: 1,
  //             stat: {
  //               name: 'special-defense',
  //               url: 'https://pokeapi.co/api/v2/stat/5/',
  //             },
  //           },
  //           {
  //             base_stat: 70,
  //             effort: 0,
  //             stat: {
  //               name: 'speed',
  //               url: 'https://pokeapi.co/api/v2/stat/6/',
  //             },
  //           },
  //         ],
  //         url: 'https://pokeapi.co/api/v2/pokemon/12/',
  //         color: 'white',
  //       },
  //       {
  //         id: 13,
  //         name: 'weedle',
  //         order: 17,
  //         default_image:
  //           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/13.svg',
  //         types: [
  //           {
  //             slot: 1,
  //             type: {
  //               name: 'bug',
  //               url: 'https://pokeapi.co/api/v2/type/7/',
  //             },
  //           },
  //           {
  //             slot: 2,
  //             type: {
  //               name: 'poison',
  //               url: 'https://pokeapi.co/api/v2/type/4/',
  //             },
  //           },
  //         ],
  //         stats: [
  //           {
  //             base_stat: 40,
  //             effort: 0,
  //             stat: {
  //               name: 'hp',
  //               url: 'https://pokeapi.co/api/v2/stat/1/',
  //             },
  //           },
  //           {
  //             base_stat: 35,
  //             effort: 0,
  //             stat: {
  //               name: 'attack',
  //               url: 'https://pokeapi.co/api/v2/stat/2/',
  //             },
  //           },
  //           {
  //             base_stat: 30,
  //             effort: 0,
  //             stat: {
  //               name: 'defense',
  //               url: 'https://pokeapi.co/api/v2/stat/3/',
  //             },
  //           },
  //           {
  //             base_stat: 20,
  //             effort: 0,
  //             stat: {
  //               name: 'special-attack',
  //               url: 'https://pokeapi.co/api/v2/stat/4/',
  //             },
  //           },
  //           {
  //             base_stat: 20,
  //             effort: 0,
  //             stat: {
  //               name: 'special-defense',
  //               url: 'https://pokeapi.co/api/v2/stat/5/',
  //             },
  //           },
  //           {
  //             base_stat: 50,
  //             effort: 1,
  //             stat: {
  //               name: 'speed',
  //               url: 'https://pokeapi.co/api/v2/stat/6/',
  //             },
  //           },
  //         ],
  //         url: 'https://pokeapi.co/api/v2/pokemon/13/',
  //         color: 'brown',
  //       },
  //       {
  //         id: 14,
  //         name: 'kakuna',
  //         order: 18,
  //         default_image:
  //           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/14.svg',
  //         types: [
  //           {
  //             slot: 1,
  //             type: {
  //               name: 'bug',
  //               url: 'https://pokeapi.co/api/v2/type/7/',
  //             },
  //           },
  //           {
  //             slot: 2,
  //             type: {
  //               name: 'poison',
  //               url: 'https://pokeapi.co/api/v2/type/4/',
  //             },
  //           },
  //         ],
  //         stats: [
  //           {
  //             base_stat: 45,
  //             effort: 0,
  //             stat: {
  //               name: 'hp',
  //               url: 'https://pokeapi.co/api/v2/stat/1/',
  //             },
  //           },
  //           {
  //             base_stat: 25,
  //             effort: 0,
  //             stat: {
  //               name: 'attack',
  //               url: 'https://pokeapi.co/api/v2/stat/2/',
  //             },
  //           },
  //           {
  //             base_stat: 50,
  //             effort: 2,
  //             stat: {
  //               name: 'defense',
  //               url: 'https://pokeapi.co/api/v2/stat/3/',
  //             },
  //           },
  //           {
  //             base_stat: 25,
  //             effort: 0,
  //             stat: {
  //               name: 'special-attack',
  //               url: 'https://pokeapi.co/api/v2/stat/4/',
  //             },
  //           },
  //           {
  //             base_stat: 25,
  //             effort: 0,
  //             stat: {
  //               name: 'special-defense',
  //               url: 'https://pokeapi.co/api/v2/stat/5/',
  //             },
  //           },
  //           {
  //             base_stat: 35,
  //             effort: 0,
  //             stat: {
  //               name: 'speed',
  //               url: 'https://pokeapi.co/api/v2/stat/6/',
  //             },
  //           },
  //         ],
  //         url: 'https://pokeapi.co/api/v2/pokemon/14/',
  //         color: 'yellow',
  //       },
  //       {
  //         id: 15,
  //         name: 'beedrill',
  //         order: 19,
  //         default_image:
  //           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/15.svg',
  //         types: [
  //           {
  //             slot: 1,
  //             type: {
  //               name: 'bug',
  //               url: 'https://pokeapi.co/api/v2/type/7/',
  //             },
  //           },
  //           {
  //             slot: 2,
  //             type: {
  //               name: 'poison',
  //               url: 'https://pokeapi.co/api/v2/type/4/',
  //             },
  //           },
  //         ],
  //         stats: [
  //           {
  //             base_stat: 65,
  //             effort: 0,
  //             stat: {
  //               name: 'hp',
  //               url: 'https://pokeapi.co/api/v2/stat/1/',
  //             },
  //           },
  //           {
  //             base_stat: 90,
  //             effort: 2,
  //             stat: {
  //               name: 'attack',
  //               url: 'https://pokeapi.co/api/v2/stat/2/',
  //             },
  //           },
  //           {
  //             base_stat: 40,
  //             effort: 0,
  //             stat: {
  //               name: 'defense',
  //               url: 'https://pokeapi.co/api/v2/stat/3/',
  //             },
  //           },
  //           {
  //             base_stat: 45,
  //             effort: 0,
  //             stat: {
  //               name: 'special-attack',
  //               url: 'https://pokeapi.co/api/v2/stat/4/',
  //             },
  //           },
  //           {
  //             base_stat: 80,
  //             effort: 1,
  //             stat: {
  //               name: 'special-defense',
  //               url: 'https://pokeapi.co/api/v2/stat/5/',
  //             },
  //           },
  //           {
  //             base_stat: 75,
  //             effort: 0,
  //             stat: {
  //               name: 'speed',
  //               url: 'https://pokeapi.co/api/v2/stat/6/',
  //             },
  //           },
  //         ],
  //         url: 'https://pokeapi.co/api/v2/pokemon/15/',
  //         color: 'yellow',
  //       },
  //       {
  //         id: 16,
  //         name: 'pidgey',
  //         order: 21,
  //         default_image:
  //           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/16.svg',
  //         types: [
  //           {
  //             slot: 1,
  //             type: {
  //               name: 'normal',
  //               url: 'https://pokeapi.co/api/v2/type/1/',
  //             },
  //           },
  //           {
  //             slot: 2,
  //             type: {
  //               name: 'flying',
  //               url: 'https://pokeapi.co/api/v2/type/3/',
  //             },
  //           },
  //         ],
  //         stats: [
  //           {
  //             base_stat: 40,
  //             effort: 0,
  //             stat: {
  //               name: 'hp',
  //               url: 'https://pokeapi.co/api/v2/stat/1/',
  //             },
  //           },
  //           {
  //             base_stat: 45,
  //             effort: 0,
  //             stat: {
  //               name: 'attack',
  //               url: 'https://pokeapi.co/api/v2/stat/2/',
  //             },
  //           },
  //           {
  //             base_stat: 40,
  //             effort: 0,
  //             stat: {
  //               name: 'defense',
  //               url: 'https://pokeapi.co/api/v2/stat/3/',
  //             },
  //           },
  //           {
  //             base_stat: 35,
  //             effort: 0,
  //             stat: {
  //               name: 'special-attack',
  //               url: 'https://pokeapi.co/api/v2/stat/4/',
  //             },
  //           },
  //           {
  //             base_stat: 35,
  //             effort: 0,
  //             stat: {
  //               name: 'special-defense',
  //               url: 'https://pokeapi.co/api/v2/stat/5/',
  //             },
  //           },
  //           {
  //             base_stat: 56,
  //             effort: 1,
  //             stat: {
  //               name: 'speed',
  //               url: 'https://pokeapi.co/api/v2/stat/6/',
  //             },
  //           },
  //         ],
  //         url: 'https://pokeapi.co/api/v2/pokemon/16/',
  //         color: 'brown',
  //       },
  //       {
  //         id: 17,
  //         name: 'pidgeotto',
  //         order: 22,
  //         default_image:
  //           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/17.svg',
  //         types: [
  //           {
  //             slot: 1,
  //             type: {
  //               name: 'normal',
  //               url: 'https://pokeapi.co/api/v2/type/1/',
  //             },
  //           },
  //           {
  //             slot: 2,
  //             type: {
  //               name: 'flying',
  //               url: 'https://pokeapi.co/api/v2/type/3/',
  //             },
  //           },
  //         ],
  //         stats: [
  //           {
  //             base_stat: 63,
  //             effort: 0,
  //             stat: {
  //               name: 'hp',
  //               url: 'https://pokeapi.co/api/v2/stat/1/',
  //             },
  //           },
  //           {
  //             base_stat: 60,
  //             effort: 0,
  //             stat: {
  //               name: 'attack',
  //               url: 'https://pokeapi.co/api/v2/stat/2/',
  //             },
  //           },
  //           {
  //             base_stat: 55,
  //             effort: 0,
  //             stat: {
  //               name: 'defense',
  //               url: 'https://pokeapi.co/api/v2/stat/3/',
  //             },
  //           },
  //           {
  //             base_stat: 50,
  //             effort: 0,
  //             stat: {
  //               name: 'special-attack',
  //               url: 'https://pokeapi.co/api/v2/stat/4/',
  //             },
  //           },
  //           {
  //             base_stat: 50,
  //             effort: 0,
  //             stat: {
  //               name: 'special-defense',
  //               url: 'https://pokeapi.co/api/v2/stat/5/',
  //             },
  //           },
  //           {
  //             base_stat: 71,
  //             effort: 2,
  //             stat: {
  //               name: 'speed',
  //               url: 'https://pokeapi.co/api/v2/stat/6/',
  //             },
  //           },
  //         ],
  //         url: 'https://pokeapi.co/api/v2/pokemon/17/',
  //         color: 'brown',
  //       },
  //       {
  //         id: 18,
  //         name: 'pidgeot',
  //         order: 23,
  //         default_image:
  //           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/18.svg',
  //         types: [
  //           {
  //             slot: 1,
  //             type: {
  //               name: 'normal',
  //               url: 'https://pokeapi.co/api/v2/type/1/',
  //             },
  //           },
  //           {
  //             slot: 2,
  //             type: {
  //               name: 'flying',
  //               url: 'https://pokeapi.co/api/v2/type/3/',
  //             },
  //           },
  //         ],
  //         stats: [
  //           {
  //             base_stat: 83,
  //             effort: 0,
  //             stat: {
  //               name: 'hp',
  //               url: 'https://pokeapi.co/api/v2/stat/1/',
  //             },
  //           },
  //           {
  //             base_stat: 80,
  //             effort: 0,
  //             stat: {
  //               name: 'attack',
  //               url: 'https://pokeapi.co/api/v2/stat/2/',
  //             },
  //           },
  //           {
  //             base_stat: 75,
  //             effort: 0,
  //             stat: {
  //               name: 'defense',
  //               url: 'https://pokeapi.co/api/v2/stat/3/',
  //             },
  //           },
  //           {
  //             base_stat: 70,
  //             effort: 0,
  //             stat: {
  //               name: 'special-attack',
  //               url: 'https://pokeapi.co/api/v2/stat/4/',
  //             },
  //           },
  //           {
  //             base_stat: 70,
  //             effort: 0,
  //             stat: {
  //               name: 'special-defense',
  //               url: 'https://pokeapi.co/api/v2/stat/5/',
  //             },
  //           },
  //           {
  //             base_stat: 101,
  //             effort: 3,
  //             stat: {
  //               name: 'speed',
  //               url: 'https://pokeapi.co/api/v2/stat/6/',
  //             },
  //           },
  //         ],
  //         url: 'https://pokeapi.co/api/v2/pokemon/18/',
  //         color: 'brown',
  //       },
  //       {
  //         id: 19,
  //         name: 'rattata',
  //         order: 25,
  //         default_image:
  //           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/19.svg',
  //         types: [
  //           {
  //             slot: 1,
  //             type: {
  //               name: 'normal',
  //               url: 'https://pokeapi.co/api/v2/type/1/',
  //             },
  //           },
  //         ],
  //         stats: [
  //           {
  //             base_stat: 30,
  //             effort: 0,
  //             stat: {
  //               name: 'hp',
  //               url: 'https://pokeapi.co/api/v2/stat/1/',
  //             },
  //           },
  //           {
  //             base_stat: 56,
  //             effort: 0,
  //             stat: {
  //               name: 'attack',
  //               url: 'https://pokeapi.co/api/v2/stat/2/',
  //             },
  //           },
  //           {
  //             base_stat: 35,
  //             effort: 0,
  //             stat: {
  //               name: 'defense',
  //               url: 'https://pokeapi.co/api/v2/stat/3/',
  //             },
  //           },
  //           {
  //             base_stat: 25,
  //             effort: 0,
  //             stat: {
  //               name: 'special-attack',
  //               url: 'https://pokeapi.co/api/v2/stat/4/',
  //             },
  //           },
  //           {
  //             base_stat: 35,
  //             effort: 0,
  //             stat: {
  //               name: 'special-defense',
  //               url: 'https://pokeapi.co/api/v2/stat/5/',
  //             },
  //           },
  //           {
  //             base_stat: 72,
  //             effort: 1,
  //             stat: {
  //               name: 'speed',
  //               url: 'https://pokeapi.co/api/v2/stat/6/',
  //             },
  //           },
  //         ],
  //         url: 'https://pokeapi.co/api/v2/pokemon/19/',
  //         color: 'purple',
  //       },
  //       {
  //         id: 20,
  //         name: 'raticate',
  //         order: 27,
  //         default_image:
  //           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/20.svg',
  //         types: [
  //           {
  //             slot: 1,
  //             type: {
  //               name: 'normal',
  //               url: 'https://pokeapi.co/api/v2/type/1/',
  //             },
  //           },
  //         ],
  //         stats: [
  //           {
  //             base_stat: 55,
  //             effort: 0,
  //             stat: {
  //               name: 'hp',
  //               url: 'https://pokeapi.co/api/v2/stat/1/',
  //             },
  //           },
  //           {
  //             base_stat: 81,
  //             effort: 0,
  //             stat: {
  //               name: 'attack',
  //               url: 'https://pokeapi.co/api/v2/stat/2/',
  //             },
  //           },
  //           {
  //             base_stat: 60,
  //             effort: 0,
  //             stat: {
  //               name: 'defense',
  //               url: 'https://pokeapi.co/api/v2/stat/3/',
  //             },
  //           },
  //           {
  //             base_stat: 50,
  //             effort: 0,
  //             stat: {
  //               name: 'special-attack',
  //               url: 'https://pokeapi.co/api/v2/stat/4/',
  //             },
  //           },
  //           {
  //             base_stat: 70,
  //             effort: 0,
  //             stat: {
  //               name: 'special-defense',
  //               url: 'https://pokeapi.co/api/v2/stat/5/',
  //             },
  //           },
  //           {
  //             base_stat: 97,
  //             effort: 2,
  //             stat: {
  //               name: 'speed',
  //               url: 'https://pokeapi.co/api/v2/stat/6/',
  //             },
  //           },
  //         ],
  //         url: 'https://pokeapi.co/api/v2/pokemon/20/',
  //         color: 'brown',
  //       },
  //     ],
  //   }),
  // )
}
