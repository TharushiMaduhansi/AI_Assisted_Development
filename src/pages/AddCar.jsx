import { useNavigate } from 'react-router-dom'
import CarForm from '../components/CarForm'
import useCarsStore from '../store/useCarsStore'

export default function AddCar() {
  const navigate = useNavigate()
  const addCar = useCarsStore((s) => s.addCar)

  const handleSubmit = (carData) => {
    addCar(carData)
    navigate('/')
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add Car</h2>
      <CarForm onSubmit={handleSubmit} />
    </div>
  )
}


