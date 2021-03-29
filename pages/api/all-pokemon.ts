import type { NextApiRequest, NextApiResponse } from 'next'

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
  }

  if (!pokeData) {
    res.status(500).json({ code: -1, message: 'Error while fetching data' })
  }

  const pokemonPromises = []

  pokeData.results.forEach(({ url }) => {
    pokemonPromises.push(fetch(url).then((res) => res.json()))
  })

  let allData = null
  try {
    allData = await Promise.all(pokemonPromises)
  } catch (error) {
    console.error(error)
  }

  if (!allData) {
    res.status(500).json({ code: -1, message: 'Error while fetching data' })
  }

  allData = allData.map(
    ({
      name,
      order,
      sprites: {
        other: {
          dream_world: { front_default: default_image },
        },
      },
      types,
      stats,
    }) => {
      const hpStat = stats.find(({ stat: { name } }) => name === 'hp')
      return { name, order, default_image, types, hpStat }
    },
  )

  pokeData.results = allData

  res.status(200).json(pokeData)
}
