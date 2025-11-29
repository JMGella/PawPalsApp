import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} /> : null;
}

export function WalkForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    startTime: initialData?.startTime || '',
    endTime: initialData?.endTime || '',
    latitude: initialData?.latitude || 41.6488,
    longitude: initialData?.longitude || -0.8891,
    maxDogs: initialData?.maxDogs || 5,
    status: initialData?.status || 'SCHEDULED'
  });

  const [position, setPosition] = useState([
    formData.latitude,
    formData.longitude
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'latitude' || name === 'longitude' || name === 'maxDogs' 
        ? parseFloat(value) || value
        : value
    }));
  };

  const handlePositionChange = (newPosition) => {
    setPosition(newPosition);
    setFormData(prev => ({
      ...prev,
      latitude: newPosition[0],
      longitude: newPosition[1]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convertir datetime a offsetdatetime 
    const formatToISO = (dateTimeString) => {
      if (!dateTimeString) return null;
      const date = new Date(dateTimeString);
      return date.toISOString();
    };

    onSubmit({
      ...formData,
      startTime: formatToISO(formData.startTime),
      endTime: formatToISO(formData.endTime),
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      maxDogs: parseInt(formData.maxDogs)
    });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">
          {initialData ? 'Editar Paseo' : 'Nuevo Paseo'}
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descripción</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="startTime" className="form-label">Fecha y hora de inicio</label>
              <input
                type="datetime-local"
                className="form-control"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="endTime" className="form-label">Fecha y hora de fin</label>
              <input
                type="datetime-local"
                className="form-control"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="maxDogs" className="form-label">Número máximo de perros</label>
              <input
                type="number"
                className="form-control"
                id="maxDogs"
                name="maxDogs"
                value={formData.maxDogs}
                onChange={handleChange}
                required
                min="1"
                max="20"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="status" className="form-label">Estado del paseo</label>
              <select
                className="form-select"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="SCHEDULED">Programado</option>
                <option value="COMPLETED">Completado</option>
                <option value="CANCELLED">Cancelado</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Ubicación del paseo</label>
            <p className="text-muted small mb-2">
              Haz clic en el mapa para seleccionar la ubicación del paseo
            </p>
            

            <input type="hidden" name="latitude" value={formData.latitude} />
            <input type="hidden" name="longitude" value={formData.longitude} />
            
            <div style={{ height: '400px', borderRadius: '4px', overflow: 'hidden' }}>
              <MapContainer 
                center={position} 
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker position={position} setPosition={handlePositionChange} />
              </MapContainer>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-info">Guardar</button>
            {onCancel && (
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
