export default function Form({ dateInput, setDateInput, distanceInput, setDistanceInput, onSubmit }) {
    return (
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Дата (ДД.ММ.ГГГГ)</label>
              <input 
                type="date" 
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
    )
  }