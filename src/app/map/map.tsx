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

export default function Map(params) {
    
  const {isLoaded} = useJsApiLoader({id:"google-map-script", googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY});
  return (
    <div>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{lat: 47.4216, lng: 19.0675}}
          zoom={13}
          >
          <MarkerF position={{lat: 47.4216, lng: 19.0675}} />
          {params.positions.map((element) => (
          <MarkerF position={{lat: element.lat, lng: element.lng}} />
          ))}

          </GoogleMap>
      )}
    
    </div>
    );
}