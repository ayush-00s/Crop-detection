import React, { useState, useEffect } from 'react';
import { fetchCropData, getMockData } from '../apis/cropFetch';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const FieldMonitoring = () => {
  const [weatherData, setWeatherData] = useState({ temperature: '24°C', location: 'Rampur' });
  const [roverData] = useState({
    id: 'BuT7x900WEbiqfsT',
    battery: '98%',
    status: 'Scanning',
    coverage: '50%'
  });

  const [environmentalData, setEnvironmentalData] = useState({
    soil: { moisture: 'N/A', temperature: 'N/A', humidity: 'N/A' },
    air: { humidity: 'N/A', temperature: 'N/A', windSpeed: 'N/A' },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFieldData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Using mock data for now since API isn't ready
      const response = getMockData();

      if (response.success && response.data) {
        const { soil, air, weather } = response.data;

        // Update environmental data
        setEnvironmentalData({
          soil: {
            moisture: soil.moisture || 'N/A',
            temperature: soil.temperature || 'N/A',
            humidity: soil.humidity || 'N/A'
          },
          air: {
            humidity: air.humidity || 'N/A',
            temperature: air.temperature || 'N/A',
            windSpeed: air.windSpeed || 'N/A'
          }
        });

        // Update weather data
        if (weather) {
          setWeatherData({
            temperature: `${weather.temperature}°C`,
            location: weather.location || 'Rampur'
          });
        }
      } else {
        throw new Error(response.error || 'Failed to fetch data');
      }
    } catch (err) {
      console.error('Error fetching field data:', err);
      setError('Failed to load field data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFieldData();
  }, []);

  const handleRefresh = () => {
    fetchFieldData();
  };

  return (
    <div className="flex-1">
      {/* Top bar */}
      <div className="flex justify-between items-center bg-green-500 p-4 rounded-lg mb-6">
        <div className="text-sm bg-white text-black px-3 py-1 rounded-full">
          {weatherData.temperature} in {weatherData.location}
        </div>
        <button 
          onClick={handleRefresh}
          disabled={isLoading}
          className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Map & Rover */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="col-span-1 md:col-span-2 bg-green-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Field Map Overview</h2>
          <div className="bg-white h-[400px] rounded-lg overflow-hidden">
            <MapContainer 
              center={[28.4495781, 77.5820586]} 
              zoom={14} 
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[28.4495781, 77.5820586]}>
                <Popup>
                  Last weed found here!
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Rover Status</h2>
          <div className="space-y-3">
            <p><strong>Rover ID:</strong> {roverData.id}</p>
            <p><strong>Battery:</strong> {roverData.battery}</p>
            <p><strong>Status:</strong> {roverData.status}</p>
            <p><strong>Area Coverage:</strong> {roverData.coverage}</p>
          </div>
        </div>
      </div>

      {/* Environmental Data */}
      <div className="bg-green-100 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-6">Environmental Panel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="bg-green-500 text-white text-center py-2 rounded mb-4 font-semibold">SOIL CONDITION</h3>
            <div className="space-y-3">
              <p><strong>Moisture:</strong> {environmentalData.soil.moisture}</p>
              <p><strong>Temperature:</strong> {environmentalData.soil.temperature}</p>
              <p><strong>Humidity:</strong> {environmentalData.soil.humidity}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <h3 className="bg-green-500 text-white text-center py-2 rounded mb-4 font-semibold">AIR CONDITION</h3>
            <div className="space-y-3">
              <p><strong>Humidity:</strong> {environmentalData.air.humidity}</p>
              <p><strong>Temperature:</strong> {environmentalData.air.temperature}</p>
              <p><strong>Wind Speed:</strong> {environmentalData.air.windSpeed}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldMonitoring;