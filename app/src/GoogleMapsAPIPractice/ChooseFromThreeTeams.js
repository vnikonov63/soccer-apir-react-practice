import React, { useState, useEffect } from "react";

function ChooseFromThreeTeams({ teams }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2>Click on the logo to choose a team</h2>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {teams.map((team) => {
          return (
            <div
              style={{
                border: "2px solid black",
                borderRadius: "10px",
                padding: "15px",
                margin: "15px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h2>{team.TeamName}</h2>
              <img src={team.Logo} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChooseFromThreeTeams;
