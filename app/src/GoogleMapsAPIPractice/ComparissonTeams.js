import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ComparissonTeams({ teams }) {
  const [games, setGames] = useState([]);
  const [team1Stats, setTeam1Stats] = useState([]);
  const [team2Stats, setTeam2Stats] = useState([]);
  useEffect(() => {
    async function getTeamsInfo() {
      const team1Id = teams[0].TeamId;
      const team2Id = teams[1].TeamId;
      try {
        const apiAdress = `https://soccer.sportmonks.com/api/v2.0/head2head/${team1Id}/${team2Id}?api_token=${process.env.REACT_APP_SPORTMONKS_API_CODE}`;
        const response = await axios.get(apiAdress);
        console.log(response);
        const information = response.data.data;
        information.slice(0, 10).map((game) => {
          if (!game.winner_team_id) {
            setTeam1Stats((prev) => {
              return [...prev, "draw"];
            });
            setTeam2Stats((prev) => {
              return [...prev, "draw"];
            });
          } else if (game.winner_team_id === team1Id) {
            setTeam1Stats((prev) => {
              return [...prev, "win"];
            });
            setTeam2Stats((prev) => {
              return [...prev, "loss"];
            });
          } else {
            setTeam1Stats((prev) => {
              return [...prev, "loss"];
            });
            setTeam2Stats((prev) => {
              return [...prev, "win"];
            });
          }
        });
        console.log(teams[0].TeamName, team1Stats);
        console.log(teams[1].TeamName, team2Stats);
      } catch (error) {
        console.log(error);
      }
    }

    getTeamsInfo();
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>{teams[0].TeamName}</h3>
        <img
          alt={"Team Logo"}
          src={teams[0].Logo}
          style={{
            width: "200px",
            height: "200px",
          }}
        />
        <div
          style={{
            display: "flex",
          }}
        >
          {team1Stats.length !== 0 &&
            team1Stats.map((result) => {
              return <CircleComponent color={result} />;
            })}
        </div>
      </div>
    </div>
  );
}

function CircleComponent({ color }) {
  return (
    <div
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "50",
        margin: "10px",
        backgroundColor:
          color === "win" ? "green" : color === "loss" ? "red" : "yellow",
      }}
    ></div>
  );
}
