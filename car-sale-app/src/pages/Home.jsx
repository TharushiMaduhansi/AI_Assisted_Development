import { useState, useMemo } from 'react'
import CarCard from '../components/CarCard'
import useCarsStore from '../store/useCarsStore'

export default function Home() {
  const cars = useCarsStore((s) => s.cars)
  const [filters, setFilters] = useState({
    title: '',
    make: '',
    model: '',
    minPrice: '',
    maxPrice: '',
  })

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      // Title filter
      if (filters.title && !car.title?.toLowerCase().includes(filters.title.toLowerCase())) {
        return false
      }
      
      // Make filter
      if (filters.make && !car.make?.toLowerCase().includes(filters.make.toLowerCase())) {
        return false
      }
      
      // Model filter
      if (filters.model && !car.model?.toLowerCase().includes(filters.model.toLowerCase())) {
        return false
      }
      
      // Price range filter
      if (filters.minPrice && car.price && car.price < parseFloat(filters.minPrice)) {
        return false
      }
      
      if (filters.maxPrice && car.price && car.price > parseFloat(filters.maxPrice)) {
        return false
      }
      
      return true
    })
  }, [cars, filters])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Car Sale</h2>
      
      {/* Filter Controls */}
      <div className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Title Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Filter by title..."
              value={filters.title}
              onChange={(e) => handleFilterChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Make Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Make
            </label>
            <input
              type="text"
              placeholder="Filter by make..."
              value={filters.make}
              onChange={(e) => handleFilterChange('make', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Model Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Model
            </label>
            <input
              type="text"
              placeholder="Filter by model..."
              value={filters.model}
              onChange={(e) => handleFilterChange('model', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Min Price Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Price ($)
            </label>
            <input
              type="number"
              placeholder="Min price..."
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Max Price Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Price ($)
            </label>
            <input
              type="number"
              placeholder="Max price..."
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Clear Filters Button */}
          <div className="flex items-end">
            <button
              onClick={() => setFilters({
                title: '',
                make: '',
                model: '',
                minPrice: '',
                maxPrice: '',
              })}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Clear Filters
            </button>
          </div>
        </div>
        
        {(filters.title || filters.make || filters.model || filters.minPrice || filters.maxPrice) && (
          <p className="text-sm text-gray-600">
            Showing {filteredCars.length} of {cars.length} cars
          </p>
        )}
      </div>

      {/* Cars Grid */}
      {cars.length === 0 ? (
        <p className="text-gray-600">No cars yet. Add one from the header.</p>
      ) : filteredCars.length === 0 ? (
        <p className="text-gray-600">No cars match your search criteria.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  )
}


