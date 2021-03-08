import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import mapStyles from "./mapsStyles";

import ListOfMarkers from "./ListOfMarkers";

const libraries = ["places"];
const mapContainerStyle = {
  width: "80vw",
  height: "80vh",
};

const center = {
  lat: 53.241505,
  lng: 50.221245,
};

const options = {
  styles: mapStyles,
  disableDefaultUi: true,
  zoomControl: true,
};

const GoogleAPIMainPage = styled.div`
  display: flex;
  flex-direction: row;
  padding: 50px;
  margin: 100px;
`;

function GoogleMapsAPIPractice() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = useState([]);

  if (loadError) {
    return "Error loading map";
  }
  if (!isLoaded) {
    return "Loading Maps";
  }

  return (
    <GoogleAPIMainPage>
      <div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={11}
          center={center}
          options={options}
          onClick={(event) => {
            if (markers.length < 2) {
              setMarkers((prev) => {
                return [
                  ...prev,
                  {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                    time: new Date(),
                  },
                ];
              });
            }
          }}
        >
          {markers.map((marker) => {
            return (
              <Marker
                key={uuidv4()}
                position={{ lat: marker.lat, lng: marker.lng }}
              />
            );
          })}
        </GoogleMap>
      </div>
      {markers.length !== 0 && <ListOfMarkers positionsInfo={markers} />}
    </GoogleAPIMainPage>
  );
}

export default GoogleMapsAPIPractice;
