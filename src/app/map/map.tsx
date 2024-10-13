"use client";

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

export default function Map() {
    
  const {isLoaded} = useJsApiLoader({id:"google-map-script", googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY});
  return (
    <div>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{lat: 47.43, lng: 19.08}}
          zoom={13}
          ></GoogleMap>
      )}
    
    </div>
    );
}