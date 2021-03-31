import * as React from 'react'

type IProps = {
  name: string
  id: number
  types: unknown[]
  default_image: string
  stats: unknown[]
  isLoading: boolean
}

export default function PokemonModal({
  name,
  id,
  types,
  default_image,
  stats,
  isLoading,
}: IProps) {
  if (isLoading) {
    return loadingCard
  }

  return (
    <div className="flex-grow self-stretch">
      <div className="flex justify-between items-baseline px-4">
        <h3 className="text-2xl text-gray-800 font-bold capitalize">{name}</h3>
        <span className="text-gray-600">#{String(id).padStart(3, '0')}</span>
      </div>
      <div className="flex gap-1 mt-1 px-4">
        {types
          .map(({ type }) => type)
          .map(({ name }) => (
            <span className="text-sm text-gray-600 font-semibold capitalize py-1 px-2 rounded-full bg-gray-100 bg-opacity-30">
              {name}
            </span>
          ))}
      </div>
      <div>
        <img src={default_image} alt={name} className="h-28 mx-auto -mb-4" />
        <div className="py-8 px-4 bg-white rounded-3xl rounded-b shadow-lg">
          <h5 className="text-sm mb-2">Stats</h5>
          {stats
            .map(({ base_stat: stat, stat: { name } }) => ({
              stat,
              name,
            }))
            .map(({ name, stat }) => (
              <div className="grid grid-cols-2 gap-2 items-baseline">
                <span className="uppercase font-bold text-sm text-gray-600">
                  {name}
                </span>
                <span className="text-xl text-gray-900">{stat}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

const loadingCard = (
  <div className="flex-grow self-stretch animate-pulse">
    <div className="h-8 flex justify-between items-baseline px-4">
      <h3 className="h-7 w-16 bg-gray-600"></h3>
      <span className="text-gray-600">####</span>
    </div>
    <div className="flex gap-1 mt-1 px-4">
      <span className="h-7 w-14 px-2 rounded-full bg-gray-100 bg-opacity-30" />
      <span className="h-7 w-14 px-2 rounded-full bg-gray-100 bg-opacity-30" />
    </div>
    <div>
      <div className="relative z-10 h-28 w-28 rounded-full bg-gray-500 bg-opacity-70 mx-auto -mb-4" />
      <div className="py-8 px-4 bg-white rounded-3xl rounded-b shadow-lg">
        <h5 className="text-sm mb-2">Stats</h5>
        {Array(6)
          .fill(0)
          .map(() => (
            <div className="h-7 grid grid-cols-2 gap-2 items-center">
              <span className="h-3 w-12 bg-gray-400" />
              <span className="h-4 w-10 bg-gray-700" />
            </div>
          ))}
      </div>
    </div>
  </div>
)
