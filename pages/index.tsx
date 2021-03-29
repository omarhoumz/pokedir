import Head from 'next/head'
import { useSWRInfinite } from 'swr'

import PokemonCard from '@/components/pokemon-card'

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData) {
    if (!previousPageData.next) {
      return null
    }

    const nextUrl = new URL(previousPageData.next).search

    return nextUrl ? `/api/all-pokemon${nextUrl}` : null
  }

  return `/api/all-pokemon`
}

export default function Home() {
  const { data, error, size, setSize, isValidating } = useSWRInfinite(getKey)

  if (error) {
    console.log(error)
    return <div>There was an error while fetching the data</div>
  }

  if (!data) {
    return <div>Loading ...</div>
  }

  const dataSize = data
    .map((p) => p.results.length)
    .reduce((prev, curr) => curr + prev, 0)

  return (
    <div>
      <Head>
        <title>PokeDir ({dataSize})</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4">
        <h1 className="text-xl font-bold text-red-500 text-center">
          PokeDir ({dataSize})
        </h1>

        <div className="my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-12">
          {data.map((pokeData) => {
            return pokeData.results.map((poke, index) => {
              return <PokemonCard {...poke} key={index} />
            })
          })}
        </div>

        <button
          disabled={isValidating}
          onClick={() => setSize(size + 1)}
          className={`p-2 bg-gray-100 rounded ${
            isValidating ? '' : 'cursor-pointer hover:bg-gray-200'
          }`}
        >
          {isValidating ? 'Loading ...' : 'Loadin more'} {size}
        </button>
      </main>

      <footer></footer>
    </div>
  )
}
