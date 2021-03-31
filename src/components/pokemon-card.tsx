import * as React from 'react'

export default function PokemonCard({
  name,
  onClick,
  default_image: imgSrc,
  color,
}: {
  name: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  color: string
  default_image?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-start justify-items-start text-left p-3 h-32 border-2 border-${color}-500 rounded focus:outline-none focus:ring focus:ring-${color}-200`}
    >
      <h3 className={`font-bold text-${color}-700 capitalize`}>{name}</h3>
      <div className="absolute -bottom-2 -right-2 w-24 h-24">
        <img
          src={imgSrc}
          alt={name}
          className="w-full h-full object-contain filter-shadow"
        />
      </div>
    </button>
  )
}
