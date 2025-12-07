export function AddDogModal({ 
  show, 
  availableDogs, 
  selectedDogId,
  submitting,
  onDogSelect,
  onClose, 
  onSubmit 
}) {
  if (!show) return null;

  return (
    <div className="modal show d-block modal-backdrop-custom">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Apuntar perro al paseo</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {availableDogs.length === 0 ? (
              <p className="text-muted">No tienes perros disponibles para apuntar a este paseo.</p>
            ) : (
              <div className="mb-3">
                <label htmlFor="dogSelect" className="form-label">Selecciona un perro</label>
                <select 
                  className="form-select" 
                  id="dogSelect"
                  value={selectedDogId}
                  onChange={(e) => onDogSelect(e.target.value)}
                >
                  <option value="">-- Selecciona un perro --</option>
                  {availableDogs.map(dog => (
                    <option key={dog.id} value={dog.id}>
                      {dog.name} ({dog.breed})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Cancelar
            </button>
            <button 
              type="button" 
              className="btn btn-info"
              onClick={onSubmit}
              disabled={!selectedDogId || submitting}
            >
              {submitting ? 'Apuntando...' : 'Apuntar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
