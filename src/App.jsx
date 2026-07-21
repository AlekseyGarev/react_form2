import { useState } from 'react'
import './App.css'

function App() {
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

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Дата (ДД.ММ.ГГГГ)</label>
              <input 
                type="text" 
                id="date" 
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                placeholder="ДД.ММ.ГГГГ"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="distance">Пройдено км</label>
              <input 
                type="number" 
                step="0.1" 
                id="distance" 
                value={distanceInput}
                onChange={(e) => setDistanceInput(e.target.value)}
                placeholder="0.0"
                required 
              />
            </div>

            <button type="submit" className="submit-btn">OK</button>
          </div>
        </form>
      </div>

      <div className="data-table">
        <div className="table-header">
          <div className="col-date">Дата</div>
          <div className="col-distance">Пройдено км</div>
          <div className="col-actions">Действия</div>
        </div>

        <div className="table-body">
          {trainings.length === 0 ? (
            <div className="empty-state">Нет данных о тренировках</div>
          ) : (
            trainings.map((item) => (
              <div key={item.id} className="table-row">
                <div className="col-date">{item.date}</div>
                <div className="col-distance">{item.distance}</div>
                <div className="col-actions">
                  <button 
                    type="button" 
                    className="action-btn delete-btn" 
                    onClick={() => handleDelete(item.id)}
                    title="Удалить"
                  >
                    ✘
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}  

export default App
