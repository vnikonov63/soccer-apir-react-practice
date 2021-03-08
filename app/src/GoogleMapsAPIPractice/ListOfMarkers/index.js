import React from "react";

import styled from "styled-components";

import MarkerInfo from "../MarkerInfo";

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
    </BoundaryListOfMarkers>
  );
}

export default ListOfMarkers;
