export default function DataTable({ trainings, onDelete }) {
    return (
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
                    onClick={() => onDelete(item.id)}
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
    )
  }