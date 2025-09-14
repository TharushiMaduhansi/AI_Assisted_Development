import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

// Car shape suggestion:
// { id: string, make: string, model: string, year: number, ... }

export const useCarsStore = create(
  persist(
    (set, get) => ({
      cars: [],

      addCar: (carData) =>
        set((state) => ({
          cars: [
            ...state.cars,
            { id: uuidv4(), ...carData },
          ],
        })),

      updateCar: (id, updates) =>
        set((state) => ({
          cars: state.cars.map((car) =>
            car.id === id ? { ...car, ...updates } : car
          ),
        })),

      removeCar: (id) =>
        set((state) => ({
          cars: state.cars.filter((car) => car.id !== id),
        })),
    }),
    {
      name: 'cars-store',
      storage: createJSONStorage(() => localStorage),
      // Only persist the cars array (omit transient functions/state)
      partialize: (state) => ({ cars: state.cars }),
    }
  )
)

export default useCarsStore


