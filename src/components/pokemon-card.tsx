import Link from 'next/link'
import * as React from 'react'

export default function PokemonCard({
  name,
  onClick,
  default_image: imgSrc,
}: {
  name: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  default_image?: string
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-start justify-items-start text-left p-3 h-32 border border-gray-200 rounded"
    >
      <h3 className="text-lg capitalize">{name}</h3>
      <div className="absolute -bottom-2 -right-2 w-24 h-24">
        <img src={imgSrc} alt={name} className="w-full h-full object-contain" />
      </div>
    </button>
  )
}
