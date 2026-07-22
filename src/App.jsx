import { useState } from 'react'
import Form from './components/Form'
import DataTable from './components/DataTable'
import './App.css'

export default function App() {
  const [trainings, setTrainings] = useState([
    { id: '1', date: '20.07.2020', distance: 5.7 },
    { id: '2', date: '19.07.2020', distance: 12.0 },
    { id: '3', date: '18.07.2020', distance: 8.5 },
  ])

  const [dateInput, setDateInput] = useState('')
  const [distanceInput, setDistanceInput] = useState('')

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('.')
    return new Date(`${year}-${month}-${day}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!dateInput || !distanceInput) return

    const parsedDistance = parseFloat(distanceInput)
    if (isNaN(parsedDistance)) return

    setTrainings((prevTrainings) => {
      const existingIndex = prevTrainings.findIndex((item) => item.date === dateInput)
      let updatedTrainings

      if (existingIndex !== -1) {
        updatedTrainings = [...prevTrainings]
        updatedTrainings[existingIndex] = {
          ...updatedTrainings[existingIndex],
          distance: Number((updatedTrainings[existingIndex].distance + parsedDistance).toFixed(1))
        }
      } else {
        const newItem = {
          id: Date.now().toString(),
          date: dateInput,
          distance: Number(parsedDistance.toFixed(1))
        }
        updatedTrainings = [...prevTrainings, newItem]
      }

      return updatedTrainings.sort((a, b) => parseDate(b.date) - parseDate(a.date))
    })

    setDateInput('')
    setDistanceInput('')
  }

  const handleDelete = (id) => {
    setTrainings((prevTrainings) => prevTrainings.filter((item) => item.id !== id))
  }

  return (
    <div className="container">
      <Form 
        dateInput={dateInput}
        setDateInput={setDateInput}
        distanceInput={distanceInput}
        setDistanceInput={setDistanceInput}
        onSubmit={handleSubmit}
      />

      <DataTable 
        trainings={trainings}
        onDelete={handleDelete}
      />
    </div>
  )
}