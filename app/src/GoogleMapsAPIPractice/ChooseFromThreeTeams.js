import React, { useState, useEffect } from "react";

function ChooseFromThreeTeams({ teams, setVisible, teamSetter }) {
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
              className="card"
              style={{
                padding: "15px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onClick={() => {
                teamSetter((prev) => {
                  return [...prev, team];
                });
                setVisible(false);
              }}
            >
              <div className="card-image">
                <img
                  style={{ width: "150px", height: "150px" }}
                  alt={"team-logo"}
                  src={team.Logo}
                />
              </div>
              <h2>{team.TeamName}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChooseFromThreeTeams;
