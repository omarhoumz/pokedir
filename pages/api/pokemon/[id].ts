import type { NextApiRequest, NextApiResponse } from 'next'

import { getPokemonWithId } from 'utils/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  res.status(200).json(await getPokemonWithId(id))
}
