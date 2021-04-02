import * as React from 'react'
import Head from 'next/head'

import Modal from '@/components/modal'
import PokemonList, { CardsLoading } from '@/components/pokemon-list'
import PokemonModal from '@/components/pokemon-modal'

enum States {
  initialLoad = 'initialLoad',
  dataLoaded = 'dataLoaded',
  loadmoreInitiated = 'loadmoreInitiated',
  loadmoreDone = 'loadmoreDone',
  loadPokemonInfoInit = 'loadPokemonInfoInit',
  loadPokemonInfoDone = 'loadPokemonInfoDone',
  closePokemonInfo = 'closePokemonInfo',
}

type StatType = {
  name: string
  value: number
}

type SinglePokemon = {
  color: string
  default_image: string
  id: number
  name: string
  order: number
  stats: StatType[]
  types: string[]
  url: string
}

type PokemonResponse = {
  count: number
  next: string | null
  previous: string | null
  results: SinglePokemon[]
}

type State = {
  loadingState: States
  nextUrl?: string
  activePokemon?: SinglePokemon
  data?: PokemonResponse[]
  error?: string
}

type Action =
  | { type: States.loadmoreInitiated }
  | {
      type: States.loadmoreDone
      pokemonData: PokemonResponse
      nextUrl: string
      error?: string
    }
  | { type: States.loadPokemonInfoInit }
  | {
      type: States.loadPokemonInfoDone
      activePokemon: SinglePokemon
      error?: string
    }
  | { type: States.closePokemonInfo }

const initialState: State = {
  loadingState: States.initialLoad,
  nextUrl: null,
  activePokemon: null,
  data: null,
  error: null,
}

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case States.loadmoreInitiated: {
      return { ...state, loadingState: States.loadmoreInitiated }
    }

    case States.loadmoreDone: {
      return {
        ...state,
        loadingState: States.loadmoreDone,
        data: [...(state.data ?? []), action.pokemonData],
        nextUrl: action.nextUrl,
        error: action.error,
      }
    }

    case States.loadPokemonInfoInit: {
      return { ...state, loadingState: States.loadPokemonInfoInit }
    }

    case States.loadPokemonInfoDone: {
      return {
        ...state,
        loadingState: States.loadPokemonInfoDone,
        activePokemon: action.activePokemon,
        error: action.error,
      }
    }

    case States.closePokemonInfo: {
      return {
        ...state,
        loadingState: States.closePokemonInfo,
        activePokemon: null,
        error: null,
      }
    }

    default: {
      throw new Error(`Unhadled action type (ts says never)`)
    }
  }
}

async function getPokemonData(dispatch, nextUrl, isFirstPage = false) {
  dispatch({ type: States.loadmoreInitiated })

  let next = null

  if (isFirstPage) {
    next = '/api/all-pokemon'
  } else {
    if (!nextUrl) {
      return
    }

    const nextUrlParams = new URL(nextUrl).search
    next = `/api/all-pokemon${nextUrlParams}`
  }

  try {
    const data = await (await fetch(next)).json()

    dispatch({
      type: States.loadmoreDone,
      nextUrl: data.next,
      pokemonData: data,
      error: '',
    })
  } catch (error) {
    dispatch({
      type: States.loadmoreDone,
      nextUrl: null,
      pokemonData: null,
      error: error,
    })
  }
}

export default function PokemonDirectory() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const { data, error, loadingState, activePokemon, nextUrl } = state

  React.useEffect(() => {
    getPokemonData(dispatch, null, true)
  }, [])

  async function handleClick(pokemon) {
    const url = `/api/pokemon/${pokemon.id}`
    dispatch({ type: States.loadPokemonInfoInit })

    try {
      const activePokemon = await (await fetch(url)).json()
      dispatch({ type: States.loadPokemonInfoDone, activePokemon })
    } catch (error) {
      dispatch({ type: States.loadPokemonInfoDone, activePokemon: null, error })
    }
  }

  function handleCloseModal() {
    dispatch({ type: States.closePokemonInfo })
  }

  if (!data) {
    return loadingElement
  }

  if (error) {
    return <div>An error has occured</div>
  }

  const loadingActivePokemon = loadingState === States.loadPokemonInfoInit

  const isModalOpen = [
    States.loadPokemonInfoInit,
    States.loadPokemonInfoDone,
  ].includes(loadingState)

  const isLoading = loadingState === States.loadmoreInitiated

  return (
    <div>
      <PokemonList
        isLoading={isLoading}
        data={data.map((pokeData) => pokeData.results).flat()}
        onClickPokemon={handleClick}
      />

      <Modal
        isOpen={isModalOpen}
        onModalClose={handleCloseModal}
        innerClassname={activePokemon ? `bg-${activePokemon.color}-400` : null}
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
        className={`px-4 py-2 bg-gray-100 rounded dark:bg-gray-600 ${
          isLoading
            ? 'cursor-default'
            : 'hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
        data-testid="btn-loadmore"
        onClick={() => getPokemonData(dispatch, nextUrl)}
      >
        {isLoading ? 'Loading ...' : 'Load more'}
      </button>
    </div>
  )
}
const loadingElement = (
  <>
    <Head>
      <title key="page-title">Loading ... - PokeDir</title>
    </Head>

    <div className="my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12">
      <CardsLoading repeat={20} />
    </div>
  </>
)
