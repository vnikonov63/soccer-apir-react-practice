import React from "react";

function TeamsList({ teams }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Your chosen Teams</h2>
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
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h2>{team.TeamName}</h2>
              <img alt={"team logo"} src={team.Logo} />
            </div>
          );
        })}
      </div>
      {teams.length === 2 ? (
        <button className="btn" style={{ width: "200px", height: "50px" }}>
          Compare two teams
        </button>
      ) : null}
    </div>
  );
}

export default TeamsList;
