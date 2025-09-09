import { useParams, useNavigate } from 'react-router-dom'
import useCarsStore from '../store/useCarsStore'

export default function CarDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const cars = useCarsStore((s) => s.cars)
  
  const car = cars.find(c => c.id === id)

  if (!car) {
    return (
      <div className="p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          ← Back
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Car not found</h2>
          <p className="mt-2 text-gray-600">The car you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  const {
    title,
    make,
    model,
    year,
    price,
    imageUrl,
  } = car

  const displayTitle = title || `${make ?? ''} ${model ?? ''}`.trim()
  const displayImage = imageUrl || 'https://via.placeholder.com/800x600?text=Car+Image'

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        ← Back
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Image Section */}
          <div className="md:w-1/2">
            <div className="aspect-video md:aspect-square">
              <img
                src={displayImage}
                alt={displayTitle || 'Car'}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {displayTitle || 'Untitled Car'}
            </h1>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Make</h3>
                <p className="text-lg text-gray-900">{make || 'Not specified'}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Model</h3>
                <p className="text-lg text-gray-900">{model || 'Not specified'}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Year</h3>
                <p className="text-lg text-gray-900">{year || 'Not specified'}</p>
              </div>

              {price != null && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Price</h3>
                  <p className="text-2xl font-bold text-green-600">
                    ${typeof price === 'number' ? price.toLocaleString() : price}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => navigate('/')}
                className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                View All Cars
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


