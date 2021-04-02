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
}
