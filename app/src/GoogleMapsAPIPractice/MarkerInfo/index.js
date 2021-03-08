import React from "react";

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
  return (
    <MarkerInfoBoundary>
      <h2>Marker Number: {index}</h2>
      <h3>Lattitude: {`${positionInfo.lat}`.substr(0, 7)}</h3>
      <h3>Longitude: {`${positionInfo.lng}`.substr(0, 7)}</h3>
      <h3>Time pressed: {positionInfo.time.getTime()}</h3>
    </MarkerInfoBoundary>
  );
}

export default MarkerInfo;
