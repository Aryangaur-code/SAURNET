"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const selectedIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  className: "hue-rotate-180" // makes it orange/red
});

function getLat(x: number) {
  return 26.8 + x * 0.005;
}

function getLng(y: number) {
  return 75.6 + y * 0.005;
}

function RecenterMap({ coords }: { coords: { x: number; y: number } }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([getLat(coords.x), getLng(coords.y)], 11, { duration: 1.5 });
  }, [coords, map]);
  return null;
}

export default function MapComponent({ centers, selectedCenter, setSelectedCenter }: any) {
  return (
    <MapContainer
      center={[getLat(selectedCenter.coords.x), getLng(selectedCenter.coords.y)]}
      zoom={11}
      style={{ height: "100%", width: "100%", zIndex: 0 }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <RecenterMap coords={selectedCenter.coords} />
      {centers.map((center: any) => (
        <Marker 
          key={center.id} 
          position={[getLat(center.coords.x), getLng(center.coords.y)]}
          icon={selectedCenter.id === center.id ? selectedIcon : icon}
          eventHandlers={{ click: () => setSelectedCenter(center) }}
        >
          <Popup>
            <div className="font-bold text-slate-800">{center.name}</div>
            <div className="text-xs text-slate-500">{center.specialty}</div>
            <div className="text-xs font-semibold mt-1">{center.phone}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
