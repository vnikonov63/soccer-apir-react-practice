import { useState, useEffect } from "react";
import Team from "./Team"

function App() {
  const [state, setState] = useState({});
  const API_CODE = "?api_token=UwxdGKRPxLpK34Bg6E5vbHpID0hIiLuji4ok46GS6TpZFLHqY2mKA5ZnMuRK";
  //17141
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://soccer.sportmonks.com/api/v2.0/standings/season/17141${API_CODE}`, {
          method: "GET"
        })
        const result = await res.json();
        console.log("result", result);
        setState(result.data[0].standings.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [])

  return (
    state && state.map((team) => {
      return <Team team_id={team.team_id} />
     })
    
  )
}

export default App;
