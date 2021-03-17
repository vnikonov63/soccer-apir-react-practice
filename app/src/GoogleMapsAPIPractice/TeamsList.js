import React from "react";

function TeamsList({ teams, compare }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {teams.length === 2 ? (
          <button
            className="btn"
            style={{ width: "200px", height: "50px", marginRight: "30px" }}
            onClick={() => {
              compare(true);
            }}
          >
            Compare
          </button>
        ) : null}
        <h2 style={{ margin: "0px" }}>Your chosen Teams</h2>
      </div>
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
              }}
            >
              <h2>{team.TeamName}</h2>
              <img
                alt={"team logo"}
                style={{
                  width: "200px",
                  height: "200px",
                }}
                src={team.Logo}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TeamsList;
