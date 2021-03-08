import React, { useState, useEffect } from "react";

function Team({ team_id, standing }) {
  const [state, setState] = useState({});
  const API_CODE =
    "?api_token=UwxdGKRPxLpK34Bg6E5vbHpID0hIiLuji4ok46GS6TpZFLHqY2mKA5ZnMuRK";

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://soccer.sportmonks.com/api/v2.0/teams/${team_id}${API_CODE}`,
          {
            method: "GET",
          }
        );
        const result = await res.json();
        setState(result.data);
        console.log(result.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div
        style={{
          width: "400px",
          height: "400px",
          border: "2px solid black",
          marginBottom: "15px",
          marginLeft: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h3>Position: {standing + 1}</h3>
        <h3>Name of the team: {state.name}</h3>
        <h4>Founded at: {state.founded}</h4>
        <img alt={`${state.name} logo`} src={state.logo_path} />
      </div>
    </>
  );
}

export default Team;
