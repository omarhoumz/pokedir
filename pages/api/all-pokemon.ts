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

  let allData = null
  try {
    allData = await Promise.all(
      pokeData.results.map(async ({ url }) => {
        const poke = await (await fetch(url)).json()

        const {
          id,
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
        } = poke

        let color = 'gray'
        try {
          const species = await (await fetch(speciesUrl)).json()
          color = species.color.name
        } catch {
          console.log(url)
          // ignore
        }

        return { id, name, order, default_image, types, stats, url, color }
      }),
    )
  } catch (error) {
    console.error(error)
  }

  if (!allData) {
    res.status(500).json({ code: -1, message: 'Error while fetching data' })
    return
  }

  pokeData.results = allData

  res.status(200).json(pokeData)
}
