import { render, screen } from '@testing-library/react'

import PokemonCard from '../components/pokemon-card'

describe('Home', () => {
  it('renders without crashing', () => {
    const expectedPokeName = 'pika'
    render(<PokemonCard name={expectedPokeName} color="yellow" />)

    expect(
      screen.getByRole('heading', { name: expectedPokeName }),
    ).toBeInTheDocument()
  })
})
