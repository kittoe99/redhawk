"use client"

interface JunkItemProps {
  item: {
    id: string
    name: string
    price: number
    icon: string
    popular?: boolean
  }
  onSelect: () => void
}

export function JunkItem({ item, onSelect }: JunkItemProps) {
  return (
    <button
      onClick={onSelect}
      className="flex flex-col items-center justify-center p-2 sm:p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200 h-20 sm:h-32"
    >
      <div className="text-2xl sm:text-4xl mb-1 sm:mb-2" dangerouslySetInnerHTML={{ __html: item.icon }} />
      <span className="text-xs sm:text-sm !text-gray-900 text-center uppercase leading-tight font-medium">
        {item.name}
      </span>
    </button>
  )
}
