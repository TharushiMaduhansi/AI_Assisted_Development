import { Link, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddCar from './pages/AddCar'
import CarDetails from './pages/CarDetails'

function App() {
  return (
    <div className="max-w-5xl mx-auto">
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <Link to="/" className="text-xl font-bold text-gray-900">CarSale</Link>
        <nav>
          <Link to="/add" className="text-blue-600 hover:underline">Add Car</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddCar />} />
          <Route path="/cars/:id" element={<CarDetails />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
