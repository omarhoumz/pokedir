import Footer from '@/components/footer'
import Head from 'next/head'
import * as React from 'react'

import PokemonDirectory from 'src/screens/pokemon-directory'

export default function Home() {
  return (
    <div className="flex-grow flex flex-col justify-stretch">
      <Head>
        <title key="page-title">PokeDir</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4 w-full max-w-4xl mx-auto flex-grow">
        <h1 className="text-xl text-gray-400 dark:text-gray-600 text-center">
          Poke<span className="font-bold">Dir</span>
        </h1>

        <PokemonDirectory />
      </main>

      <Footer />
    </div>
  )
}
