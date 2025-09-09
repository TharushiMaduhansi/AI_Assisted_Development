import { Link } from 'react-router-dom'

export default function CarCard({ car }) {
  const {
    id,
    title,
    make,
    model,
    year,
    price,
    imageUrl,
  } = car || {}

  const displayTitle = title || `${make ?? ''} ${model ?? ''}`.trim()
  const displayImage = imageUrl || 'https://via.placeholder.com/600x400?text=Car'

  return (
    <Link
      to={`/cars/${id}`}
      className="block rounded-lg overflow-hidden bg-white shadow hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="aspect-video w-full bg-gray-200 overflow-hidden">
        <img
          src={displayImage}
          alt={displayTitle || 'Car'}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {displayTitle || 'Untitled Car'}
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          {(make || model || year) ? [make, model, year].filter(Boolean).join(' ') : 'Specs unavailable'}
        </p>
        {price != null && (
          <p className="mt-2 text-base font-medium text-gray-900">
            ${typeof price === 'number' ? price.toLocaleString() : price}
          </p>
        )}
      </div>
    </Link>
  )
}


