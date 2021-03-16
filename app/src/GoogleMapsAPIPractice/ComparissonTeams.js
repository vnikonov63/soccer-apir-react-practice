import React, { useState, useEffect } from "react";
import axios from "axios";
import { set } from "mongoose";

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

        information.map((game) => {
          const newGame = {
            localTeam:
              game.localteam_id === team1Id
                ? teams[0].TeamName
                : teams[1].TeamName,
            localTeamLogo:
              game.localteam_id === team1Id ? teams[0].Logo : teams[1].Logo,
            visitorTeamLogo:
              game.localteam_id === team1Id ? teams[1].Logo : teams[0].Logo,
            visitorTeam:
              game.localteam_id === team1Id
                ? teams[1].TeamName
                : teams[0].TeamName,
            localTeamScore: game.scores.localteam_score,
            visitorTeamScore: game.scores.visitorteam_score,
            date: game.time.starting_at.date,
          };
          setGames((prev) => {
            return [...prev, newGame];
          });
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
    <>
      <div>
        <button className="btn red">Reset</button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {team1Stats.length !== 0 && (
            <DisplayTeam
              teamLogo={teams[0].Logo}
              teamStats={team1Stats}
              teamName={teams[0].TeamName}
            />
          )}
          <div style={{ width: "100px" }}></div>
          {team2Stats.length !== 0 && (
            <DisplayTeam
              teamLogo={teams[1].Logo}
              teamStats={team2Stats}
              teamName={teams[1].TeamName}
            />
          )}
        </div>
        <h2>List of Previous Games</h2>
        {games.length !== 0 &&
          games.map((game) => {
            return (
              <Game
                localTeam={game.localTeam}
                visitorTeam={game.visitorTeam}
                localTeamScore={game.localTeamScore}
                visitorTeamScore={game.visitorTeamScore}
                localTeamLogo={game.localTeamLogo}
                visitorTeamLogo={game.visitorTeamLogo}
                date={game.date}
              />
            );
          })}
      </div>
    </>
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

function DisplayTeam({ teamLogo, teamStats, teamName }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3>{teamName}</h3>
      <img
        alt={"Team Logo"}
        src={teamLogo}
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
        {teamStats.map((result) => {
          return <CircleComponent color={result} />;
        })}
      </div>
    </div>
  );
}

function Game({
  localTeam,
  visitorTeam,
  localTeamScore,
  visitorTeamScore,
  localTeamLogo,
  visitorTeamLogo,
  date,
}) {
  return (
    <div style={{ display: "flex", margin: "20px" }}>
      <div style={{ display: "flex" }}>
        <img
          style={{ width: "100px", height: "100px", marginRight: "100px" }}
          alt={"local team logo"}
          src={localTeamLogo}
        />
        <h3>{localTeamScore}</h3>
      </div>
      <div style={{ width: "75px" }}></div>
      <div style={{ display: "flex" }}>
        <h3>{visitorTeamScore}</h3>
        <img
          style={{ width: "100px", height: "100px", marginLeft: "100px" }}
          alt={"visitor team logo"}
          src={visitorTeamLogo}
        />
      </div>
      <h3 style={{ marginLeft: "75px" }}>{date}</h3>
    </div>
  );
}
