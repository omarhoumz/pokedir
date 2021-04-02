export async function getPokemon(url) {
  let pokemon = null
  try {
    pokemon = await (await fetch(url)).json()
  } catch (error) {
    console.error(error)
    throw new Error(`Error while fetching data for Pokemon: ${url}`)
  }

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
  } = pokemon

  let color = 'gray'
  try {
    const species = await (await fetch(speciesUrl)).json()
    color = species.color.name
  } catch (error) {
    console.error(error)
    throw new Error(
      `Error while fetching data for Pokemon's species: ${speciesUrl}`,
    )
  }

  return { id, name, order, default_image, types, stats, url, color }
}

export async function getPokemonWithId(id) {
  return getPokemon(`https://pokeapi.co/api/v2/pokemon/${id}/`)
}
