"use client";

//import MyMap from "./map"
import React, { useEffect, useState, useRef } from 'react';
import { APIProvider, Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';

export default function Home() {
  const [markers, setMarkers] = useState([]);
  const [positions, setPositions] = useState([]);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const mapRef = useRef(null);

  const createMarkers = async (positions) => {
    if (mapRef.current) {
      // Clear existing markers
      markers.forEach((marker) => marker.setMap(null)); // Remove markers from the map
      const newMarkers = []; // Array to hold new markers

      const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

      // Create markers for all positions
      for (const position of positions) {
        const pin = new PinElement({ scale: hoveredMarker === position.id ? 1.5 : 0.9, title: "position.time" }); // Create a new pin element
        const marker = new AdvancedMarkerElement({
          map: mapRef.current, // Use the map reference
          position: { lat: position.lat, lng: position.lng },
          content: pin.element, // Set pin as marker content
        });
        newMarkers.push(marker); // Add marker to the array
      }

      setMarkers(newMarkers);
    }
  };

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch('/api/positions');
        const data = await response.json();
        await createMarkers(data);
        setPositions(data);

      } catch (error) {
        console.error('Error fetching positions:', error);
      }
    };

    // Fetch positions every 5 seconds
    const id = setInterval(fetchPositions, 5000);
    fetchPositions(); // Initial fetch
    return () => clearInterval(id);
  }, []);

  useEffect(()=>{
    const redraw = async () => {
      await createMarkers(positions);
    };
    redraw();
  }, [hoveredMarker]);

  // Handle table row hover
  const handleMouseEnter = (id) => {
    setHoveredMarker(id); // Set hovered marker
  };

  const handleMouseLeave = () => {
    setHoveredMarker(null); // Reset hover state
  };
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Hello from my Raspberry Pi</h1>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <Map
            defaultCenter={{lat: 47.4216, lng: 19.0675}} defaultZoom={13} mapId="DEMO_MAP_ID" style={{ height: '600px' }}
            onCameraChanged={ (ev: MapCameraChangedEvent) =>
                mapRef.current=ev.map}
            >
          </Map>
        </APIProvider>
        {/* Table with positions */}
      <table className="table-auto mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Position</th>
            <th className="px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr
              key={position.id}
              onMouseEnter={() => handleMouseEnter(position.id)} // Hover starts
              onMouseLeave={handleMouseLeave} // Hover ends
              className="hover:bg-gray-200 cursor-pointer"
            >
              <td className="border px-4 py-2">{position.id}</td>
              <td className="border px-4 py-2">Lat: {position.lat} Lng: {position.lng}</td>
              <td className="border px-4 py-2">{position.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </main>
  );
}
