import { useState, useEffect } from "react";

function App() {
  const [state, setState] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://soccer.sportmonks.com/api/v2.0/teams/1?api_token=UwxdGKRPxLpK34Bg6E5vbHpID0hIiLuji4ok46GS6TpZFLHqY2mKA5ZnMuRK", {
          method: "GET"
        })
        const result = await res.json();
        setState(result.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [])

  return (
    <img src={state.logo_path} />
  )
}

export default App;
