"use client";

import Map from "./map"
import { useEffect, useState } from 'react';

import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";


const containerStyle = {
width: "1200px",
height: "600px"
}
export default function Home() {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    // Fetch the positions from the API route
    fetch('/api/positions')
      .then((response) => response.json())
      .then((data) => setPositions(data))
      .catch((error) => console.error('Error fetching positions:', error));
  }, []);

  const {isLoaded} = useJsApiLoader({id:"google-map-script", googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY});
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Hello from my Raspberry Pi</h1>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{lat: 47.4216, lng: 19.0675}}
          zoom={13}
          >
          {positions.map((element) => (
          <MarkerF position={{lat: element.lat, lng: element.lng}} />
          ))}

          </GoogleMap>
      )}
      </main>
  );
}
