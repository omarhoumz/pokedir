import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`

  let pokeData = null
  try {
    pokeData = await (await fetch(url)).json()
  } catch (error) {
    console.error(error)
  }

  if (!pokeData) {
    res.status(500).json({ code: -1, message: 'Error while fetching data' })
  }

  const {
    name,
    order,
    sprites: {
      other: {
        dream_world: { front_default: default_image },
      },
    },
    types,
    stats,
    species: { url: speciesUrl },
  } = pokeData

  let color = 'gray'
  try {
    const species = await (await fetch(speciesUrl)).json()
    color = species.color.name
  } catch (error) {
    console.error(error)
  }

  const newPoke = { id, name, order, default_image, types, stats, url, color }

  res.status(200).json(newPoke)
}
