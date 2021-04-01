import * as React from 'react'
import Head from 'next/head'

import PokemonCard from '@/components/pokemon-card'
import Modal from '@/components/model'
import PokemonModal from '@/components/pokemon-modal'
import PokeballSvg from '@/components/pokeball-svg'

export default function Home() {
  const [data, setData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [size, setSize] = React.useState(1)
  const [nextUrl, setNextUrl] = React.useState(`/api/all-pokemon`)

  const [isModalVisble, setIsModalVisble] = React.useState(false)
  const [loadingActivePokemon, setLoadingActivePokemon] = React.useState(false)
  const [activePokemon, setActivePokemon] = React.useState(null)

  React.useEffect(() => {
    setIsLoading(true)
    fetch(nextUrl)
      .then((res) => res.json())
      .then((newData) =>
        setData((d) => {
          const nextUrlParams = new URL(newData.next).search
          setNextUrl(`/api/all-pokemon${nextUrlParams}`)
          setIsLoading(false)
          return [...(d ?? []), newData]
        }),
      )
  }, [size])

  // if (error) {
  //   console.log(error)
  //   return <div>There was an error while fetching the data</div>
  // }

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

        <div
          className="my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12"
          data-testid="cards-wrapper"
        >
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
          {isLoading ? <CardsLoading repeat={3} /> : null}
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
          disabled={isLoading}
          onClick={() => {
            setSize((size) => {
              return size + 1
            })
          }}
          className={`p-2 bg-gray-100 rounded ${
            isLoading ? 'cursor-default' : 'hover:bg-gray-200'
          }`}
          data-testid="btn-loadmore"
        >
          {isLoading ? 'Loading ...' : 'Load more'}
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
        <CardsLoading repeat={20} />
      </div>
    </main>
  </div>
)

function CardsLoading({ repeat = 4 }) {
  return (
    <>
      {Array(repeat)
        .fill(0)
        .map((_, index) => (
          <div
            className="relative animate-pulse p-3 h-32 bg-gray-50 border-2 border-gray-500 rounded"
            key={index}
          >
            <h3 className="bg-gray-500 bg-opacity-50 h-5 w-14" />
            <PokeballSvg className="absolute bottom-2 right-2 w-16 h-16 text-gray-200" />
          </div>
        ))}
    </>
  )
}
