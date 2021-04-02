### PokeDir

A directory of Pokemons.

## Why NextJs

NextJs supports Typescript out of the box.

## Using the API

I used [NextJs's API routes](https://nextjs.org/docs/api-routes/introduction) to abstruct getting the data from the [Pokemon API](https://pokeapi.co/docs/v2).

In the `/api/all-pokemon` I only needed the `name`, `image`, and `color`, so it could be optimized.

In the `/api/pokemon/[id]` we could easily add **more info** to display in the pokemon modal info.

## Styling and design

I used [Tailwindcss](https://tailwindcss.com/) for the styling (and dark mode).

The UI needs some love. And the UX is okay. There are some loading states that are implemented.
