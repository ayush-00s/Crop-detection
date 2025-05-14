import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function WeedManagement({
  temperature = "24°C",
  location = "Rampur",
  lastFoundDate = "March 28, 2025",
  lastFoundLocation = "Field Section B-7",
  weedType = "Amaranthus retroflexus (Redroot Pigweed)",
  mapUrl = "/api/placeholder/600/300" // Placeholder image
}) {
  return (
    <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden">
      {/* Top bar */}
      <div className="flex justify-between items-center bg-green-500 p-4">
        <h2 className="text-xl font-bold text-green-800">Weed Management</h2>
        <div className="text-sm bg-white text-green-700 px-3 py-1 rounded-full font-medium">
          {temperature} in {location}
        </div>
      </div>
      
      {/* Main Card */}
      <div className="p-6 bg-green-200">
        <h3 className="text-lg font-semibold mb-4 text-green-800">Weed Detection Summary</h3>
        
        {/* Map */}
        <div className="w-full h-64 bg-gray-300 rounded-lg overflow-hidden mb-6">
          {/* Using placeholder image - replace with actual map component */}
          <div className="w-full h-48 rounded-lg overflow-hidden mb-6">
            <MapContainer 
              center={[28.4495781, 77.5820586]} // Example center (Herbert Park, Dublin)
              zoom={14} 
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {/* Example marker */}
              <Marker position={[28.4495781, 77.5820586]}>
                <Popup>
                  Last weed found here!
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
        
        {/* Weed Information */}
        <div className="bg-green-100 p-4 rounded-lg">
          <h4 className="font-bold text-green-800 mb-3">Detection Details</h4>
          
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-green-50 rounded-md">
              <div className="w-40 font-semibold text-gray-700">Last Found Date:</div>
              <div>{lastFoundDate}</div>
            </div>
            
            <div className="flex items-center p-3 bg-green-50 rounded-md">
              <div className="w-40 font-semibold text-gray-700">Last Found Location:</div>
              <div>{lastFoundLocation}</div>
            </div>
            
            <div className="flex items-center p-3 bg-green-50 rounded-md">
              <div className="w-40 font-semibold text-gray-700">Weed Type:</div>
              <div className="flex-1">{weedType}</div>
              <div>
                <button className="bg-yellow-300 text-green-800 px-4 py-2 rounded-md hover:bg-yellow-400 transition-colors font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}