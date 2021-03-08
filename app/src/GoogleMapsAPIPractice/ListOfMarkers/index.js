import React from "react";

import styled from "styled-components";

import MarkerInfo from "../MarkerInfo";

import countDistance from "../distanceGivenTwoPoints";

const BoundaryListOfMarkers = styled.div`
  border: 2px solid black;
  padding 20px;
  margin 20px;
  border-radius: 9px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

function ListOfMarkers({ positionsInfo }) {
  return (
    <BoundaryListOfMarkers>
      {positionsInfo.map((individualMarker, index) => {
        return <MarkerInfo positionInfo={individualMarker} index={index} />;
      })}
      {positionsInfo.length === 2 ? (
        <p>
          The distance is:
          {`${countDistance(
            positionsInfo[0].lat,
            positionsInfo[1].lat,
            positionsInfo[0].lng,
            positionsInfo[1].lng
          )}
          `.substr(0, 10)}
          meters
        </p>
      ) : null}
    </BoundaryListOfMarkers>
  );
}

export default ListOfMarkers;
