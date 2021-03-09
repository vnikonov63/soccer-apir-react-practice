import React, { useEffect, useState } from "react";
import axios from "axios";

import styled from "styled-components";

const MarkerInfoBoundary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid black;
  margin: 5px;
  padding: 10px;
`;

function MarkerInfo({ positionInfo, index }) {
  const [addressFind, setAddressFind] = useState(false);
  const [humanAdress, setHumanAdress] = useState({});

  useEffect(() => {
    async function fetchReverseGeolocation() {
      const apiAdress = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${positionInfo.lat},${positionInfo.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
      const response = await axios.get(apiAdress);
      const a = response.data.results.find((adress) => {
        return adress.types.includes("administrative_area_level_1");
      });
      setHumanAdress(a.formatted_address);
    }
    fetchReverseGeolocation();
  }, []);

  return (
    <MarkerInfoBoundary>
      <h2>Marker Number: {index}</h2>
      <h3>Lattitude: {`${positionInfo.lat}`.substr(0, 7)}</h3>
      <h3>Longitude: {`${positionInfo.lng}`.substr(0, 7)}</h3>
      <h3>Time pressed: {positionInfo.time.getTime()}</h3>
      {addressFind ? (
        <p>{humanAdress}</p>
      ) : (
        <button
          onClick={() => {
            setAddressFind(true);
          }}
        >
          Find closest adress
        </button>
      )}
    </MarkerInfoBoundary>
  );
}

export default MarkerInfo;
