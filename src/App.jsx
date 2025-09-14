import React from 'react';

// CarForm Component
function CarForm({ onAddCar }) {
  const [formData, setFormData] = React.useState({
    title: '',
    make: '',
    model: '',
    year: '',
    price: '',
    imageFile: null
  });

  const [imagePreview, setImagePreview] = React.useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new car object
    const newCar = {
      id: Date.now(), // Simple ID generation
      title: formData.title,
      make: formData.make,
      model: formData.model,
      year: parseInt(formData.year),
      price: parseInt(formData.price),
      imageFile: formData.imageFile,
      imageUrl: imagePreview // Use preview URL for display
    };

    // Add car to the list
    onAddCar(newCar);
    
    // Clear form
    setFormData({
      title: '',
      make: '',
      model: '',
      year: '',
      price: '',
      imageFile: null
    });
    setImagePreview(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imageFile: file
      });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Car Listing</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="e.g., Honda Civic for sale"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
          />
        </div>

        {/* Make and Model Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="make" className="block text-sm font-semibold text-gray-700 mb-2">
              Make
            </label>
            <input
              type="text"
              id="make"
              placeholder="e.g., Honda"
              value={formData.make}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-semibold text-gray-700 mb-2">
              Model
            </label>
            <input
              type="text"
              id="model"
              placeholder="e.g., Civic"
              value={formData.model}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
            />
          </div>
        </div>

        {/* Year and Price Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="year" className="block text-sm font-semibold text-gray-700 mb-2">
              Year
            </label>
            <input
              type="number"
              id="year"
              placeholder="e.g., 2020"
              min="1900"
              max="2024"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              placeholder="e.g., 15000"
              min="0"
              step="100"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
            />
          </div>
        </div>

        {/* Image Upload Field */}
        <div>
          <label htmlFor="imageFile" className="block text-sm font-semibold text-gray-700 mb-2">
            Car Image
          </label>
          <div className="space-y-4">
            {/* File Input */}
            <div className="relative">
              <input
                type="file"
                id="imageFile"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={imagePreview}
                    alt="Car preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-lg"
          >
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
}

// CarCard Component
function CarCard({ car, onViewDetails }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Car Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {car.imageUrl ? (
          <img
            src={car.imageUrl}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
            <div className="text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <p className="text-sm">No Image</p>
            </div>
          </div>
        )}
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          ${car.price?.toLocaleString()}
        </div>
      </div>

      {/* Car Details */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {car.title}
        </h3>

        {/* Make, Model, Year */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-semibold text-blue-600">
            {car.make} {car.model}
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600 font-medium">
            {car.year}
          </span>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => onViewDetails(car)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

// CarDetailsModal Component
function CarDetailsModal({ car, isOpen, onClose }) {
  if (!isOpen || !car) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Car Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Car Image */}
          <div className="mb-6">
            <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
              {car.imageUrl ? (
                <img
                  src={car.imageUrl}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                  <div className="text-center text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-lg">No Image Available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Car Information */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{car.title}</h3>
            </div>

            {/* Make, Model, Year */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-600 mb-1">Make</p>
                <p className="text-lg font-bold text-blue-600">{car.make}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-600 mb-1">Model</p>
                <p className="text-lg font-bold text-blue-600">{car.model}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-600 mb-1">Year</p>
                <p className="text-lg font-bold text-gray-800">{car.year}</p>
              </div>
            </div>

            {/* Price */}
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <p className="text-sm font-semibold text-green-600 mb-2">Price</p>
              <p className="text-3xl font-bold text-green-700">${car.price?.toLocaleString()}</p>
            </div>

            {/* Additional Details */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Vehicle Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Vehicle ID:</span>
                  <span className="ml-2 text-gray-600">#{car.id}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Listing Date:</span>
                  <span className="ml-2 text-gray-600">{new Date(car.id).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 font-semibold transition-colors duration-200"
          >
            Close
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
            Contact Seller
          </button>
        </div>
      </div>
    </div>
  );
}

// FilterControls Component
function FilterControls({ 
  searchTerm, setSearchTerm, 
  selectedMake, setSelectedMake, 
  selectedModel, setSelectedModel,
  minPrice, setMinPrice, 
  maxPrice, setMaxPrice,
  selectedYear, setSelectedYear,
  cars,
  onClearFilters 
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  // Get unique makes, models, and years from cars
  const uniqueMakes = [...new Set(cars.map(car => car.make))].sort();
  const uniqueModels = [...new Set(cars.map(car => car.model))].sort();
  const uniqueYears = [...new Set(cars.map(car => car.year))].sort((a, b) => b - a);
  
  // Get price range
  const prices = cars.map(car => car.price);
  const minCarPrice = Math.min(...prices);
  const maxCarPrice = Math.max(...prices);

  // Check if any filters are active
  const hasActiveFilters = searchTerm || selectedMake || selectedModel || selectedYear || 
    minPrice !== minCarPrice || maxPrice !== maxCarPrice;

  return (
    <div className="bg-white rounded-xl shadow-lg mb-8">
      {/* Header with Toggle Button */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-gray-800">Filter Cars</h3>
          {hasActiveFilters && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Active
            </span>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors duration-200"
        >
          <span className="text-sm font-medium">
            {isExpanded ? 'Hide Filters' : 'Show Filters'}
          </span>
          <svg 
            className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Expandable Content */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-6 space-y-6">
          {/* Search Input */}
          <div>
            <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
              Search Title
            </label>
            <input
              type="text"
              id="search"
              placeholder="e.g., Honda Civic for sale..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
            />
          </div>

          {/* Make and Model Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="make" className="block text-sm font-semibold text-gray-700 mb-2">
                Make
              </label>
              <select
                id="make"
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
              >
                <option value="">All Makes</option>
                {uniqueMakes.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-semibold text-gray-700 mb-2">
                Model
              </label>
              <select
                id="model"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
              >
                <option value="">All Models</option>
                {uniqueModels.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Year Filter */}
          <div>
            <label htmlFor="year" className="block text-sm font-semibold text-gray-700 mb-2">
              Year
            </label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
            >
              <option value="">All Years</option>
              {uniqueYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price Range: ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}
            </label>
            <div className="relative">
              <div className="relative h-2 bg-gray-200 rounded-lg">
                {/* Background track */}
                <div 
                  className="absolute h-2 bg-blue-500 rounded-lg"
                  style={{
                    left: `${((minPrice - minCarPrice) / (maxCarPrice - minCarPrice)) * 100}%`,
                    width: `${((maxPrice - minPrice) / (maxCarPrice - minCarPrice)) * 100}%`
                  }}
                ></div>
                
                {/* Min price slider */}
                <input
                  type="range"
                  min={minCarPrice}
                  max={maxCarPrice}
                  value={minPrice}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value <= maxPrice) {
                      setMinPrice(value);
                    }
                  }}
                  className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider"
                  style={{ zIndex: minPrice > maxPrice - 1000 ? 5 : 3 }}
                />
                
                {/* Max price slider */}
                <input
                  type="range"
                  min={minCarPrice}
                  max={maxCarPrice}
                  value={maxPrice}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value >= minPrice) {
                      setMaxPrice(value);
                    }
                  }}
                  className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider"
                  style={{ zIndex: maxPrice < minPrice + 1000 ? 5 : 3 }}
                />
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>${minCarPrice.toLocaleString()}</span>
              <span>${maxCarPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="flex justify-end">
            <button
              onClick={onClearFilters}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [currentView, setCurrentView] = React.useState('form'); // 'form' or 'listings'
  
  // Filter states
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedMake, setSelectedMake] = React.useState('');
  const [selectedModel, setSelectedModel] = React.useState('');
  const [selectedYear, setSelectedYear] = React.useState('');
  
  // Modal states
  const [selectedCar, setSelectedCar] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  // Sample car data for demonstration
  const [cars, setCars] = React.useState([
    {
      id: 1,
      title: "Honda Civic for sale",
      make: "Honda",
      model: "Civic",
      year: 2020,
      price: 15000,
      imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Toyota Camry - Excellent Condition",
      make: "Toyota",
      model: "Camry",
      year: 2019,
      price: 18000,
      imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "BMW 3 Series - Luxury Sedan",
      make: "BMW",
      model: "3 Series",
      year: 2021,
      price: 35000,
      imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Ford Mustang - Sports Car",
      make: "Ford",
      model: "Mustang",
      year: 2020,
      price: 28000,
      imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop"
    }
  ]);

  // Price range states - initialize based on cars data
  const prices = cars.map(car => car.price);
  const minCarPrice = Math.min(...prices);
  const maxCarPrice = Math.max(...prices);
  const [minPrice, setMinPrice] = React.useState(minCarPrice);
  const [maxPrice, setMaxPrice] = React.useState(maxCarPrice);

  // Update price range when cars change
  React.useEffect(() => {
    const newPrices = cars.map(car => car.price);
    const newMinPrice = Math.min(...newPrices);
    const newMaxPrice = Math.max(...newPrices);
    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
  }, [cars]);

  // Function to add a new car
  const handleAddCar = (newCar) => {
    setCars(prevCars => [...prevCars, newCar]);
  };

  // Function to handle viewing car details
  const handleViewDetails = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  // Function to clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedMake('');
    setSelectedModel('');
    setSelectedYear('');
    setMinPrice(minCarPrice);
    setMaxPrice(maxCarPrice);
  };

  // Filter cars based on all filter criteria
  const filteredCars = cars.filter(car => {
    // Search filter (title only)
    const matchesSearch = searchTerm === '' || 
      car.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Make filter
    const matchesMake = selectedMake === '' || car.make === selectedMake;
    
    // Model filter
    const matchesModel = selectedModel === '' || car.model === selectedModel;
    
    // Year filter
    const matchesYear = selectedYear === '' || car.year === parseInt(selectedYear);
    
    // Price range filter
    const matchesPriceRange = car.price >= minPrice && car.price <= maxPrice;
    
    return matchesSearch && matchesMake && matchesModel && matchesYear && matchesPriceRange;
  });

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <header className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-white">Car Hub</h1>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setCurrentView('listings')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-200"
              >
                View Listings
              </button>
              <button 
                onClick={() => setCurrentView('form')}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-200"
              >
                Add Listing
              </button>
            </div>
          </div>
      </header>

        {/* Main Content */}
        <main className={currentView === 'form' ? 'min-h-screen flex items-center justify-center' : 'bg-gray-800 rounded-lg shadow-lg p-8'}>
          {currentView === 'form' ? (
            <CarForm onAddCar={handleAddCar} />
          ) : (
            <div>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Available Cars</h2>
              
              {/* Filter Controls */}
              <FilterControls 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedMake={selectedMake}
                setSelectedMake={setSelectedMake}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                cars={cars}
                onClearFilters={handleClearFilters}
              />
              
              {/* Results Count */}
              <div className="mb-4">
                <p className="text-white text-sm">
                  Showing {filteredCars.length} of {cars.length} cars
                </p>
              </div>
              
              {/* Car Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCars.length > 0 ? (
                  filteredCars.map(car => (
                    <CarCard key={car.id} car={car} onViewDetails={handleViewDetails} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="text-white text-lg">
                      <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                      <p className="text-xl font-semibold mb-2">No cars found</p>
                      <p className="text-gray-300">Try adjusting your search criteria</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
      </main>
      </div>
      
      {/* Car Details Modal */}
      <CarDetailsModal 
        car={selectedCar}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default App
