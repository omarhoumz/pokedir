import * as React from 'react'
import Head from 'next/head'
import { useSWRInfinite } from 'swr'

import PokemonCard from '@/components/pokemon-card'
import Modal from '@/components/model'
import PokemonModal from '@/components/pokemon-modal'

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
  const [isModalVisble, setIsModalVisble] = React.useState(false)
  const [loadingActivePokemon, setLoadingActivePokemon] = React.useState(false)
  const [activePokemon, setActivePokemon] = React.useState(null)

  if (error) {
    console.log(error)
    return <div>There was an error while fetching the data</div>
  }

  if (!data) {
    return loadingElement
  }

  async function handleClick(pokemon) {
    const url = `/api/pokemon/${pokemon.id}`
    setLoadingActivePokemon(true)
    setIsModalVisble(true)

    const pokem = await (await fetch(url)).json()
    setActivePokemon(pokem)
    setLoadingActivePokemon(false)
  }

  function handleCloseModal() {
    setIsModalVisble(false)
    setActivePokemon(null)
  }

  return (
    <div>
      <Head>
        <title>PokeDir</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4 max-w-4xl mx-auto">
        <h1 className="text-xl font-bold text-red-500 text-center">PokeDir</h1>

        <div className="my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12">
          {data.map((pokeData) => {
            return pokeData.results.map((poke) => {
              return (
                <PokemonCard
                  {...poke}
                  key={poke.id}
                  onClick={() => handleClick(poke)}
                />
              )
            })
          })}
        </div>

        <Modal
          isOpen={isModalVisble}
          onModalClose={handleCloseModal}
          innerClassname={
            activePokemon ? `bg-${activePokemon.color}-400` : null
          }
        >
          <button
            className={`m-4 self-end px-2 rounded-full bg-opacity-40 ${
              activePokemon
                ? `text-${activePokemon.color}-800 bg-${activePokemon.color}-50`
                : null
            }`}
            onClick={handleCloseModal}
          >
            Close Info
          </button>
          {activePokemon || loadingActivePokemon ? (
            <PokemonModal {...activePokemon} isLoading={loadingActivePokemon} />
          ) : null}
        </Modal>

        <button
          disabled={isValidating}
          onClick={() => setSize(size + 1)}
          className={`p-2 bg-gray-100 rounded ${
            isValidating ? '' : 'cursor-pointer hover:bg-gray-200'
          }`}
        >
          {isValidating ? 'Loading ...' : 'Loadin more'}
        </button>
      </main>

      <footer></footer>
    </div>
  )
}

const loadingElement = (
  <div>
    <Head>
      <title>Loading ... - PokeDir</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold text-red-500 text-center">PokeDir</h1>

      <div className="my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12">
        {Array(20)
          .fill(0)
          .map(() => (
            <div className="animate-pulse p-3 h-32 bg-gray-50 border-2 border-gray-500 rounded">
              <h3 className="bg-gray-500 bg-opacity-50 h-5 w-14" />
            </div>
          ))}
      </div>
    </main>
  </div>
)
