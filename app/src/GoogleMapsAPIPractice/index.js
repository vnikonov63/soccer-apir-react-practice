import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import axios from "axios";

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
          zoom={4}
          center={center}
          options={options}
          onClick={async (event) => {
            const Latitude = event.latLng.lat()
            const Longitude = event.latLng.lng()
            const response = await axios({
              method: 'post',
              url: 'http://localhost:3001/getTeams',
              headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
              data: JSON.stringify(
                {"Latitude":Latitude,"Longitude":Longitude}
              )
            })
            console.log(response);
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
