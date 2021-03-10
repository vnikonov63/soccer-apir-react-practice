import express from "express";
import mongoose from "mongoose";
import axios from "axios";

import Leagues from "./models/TeamsGeoTags.js";

import { fetchReverseGeolocation, fetchReverseGeolocationEngland } from "./externalAPIRequests/getHumanReadableAdress.js";

import distanceGivenTwoPoints from "./externalAPIRequests/distanceGivenTwoPoints.js"


const app = express();

const PORT = 3001;

mongoose.connect("mongodb://localhost:27017/GeoSoccerPlayground", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/getTeams", async (req, res) => {
  try {
    // find the human adress
    let humanAdress = await fetchReverseGeolocation(req.body);
    
    const countryName = humanAdress.split(',')[1].trim();

    if (countryName == "UK") {
      humanAdress = await fetchReverseGeolocationEngland(req.body);
    }

    // find all the teams from this country
    // TODO: if find return empty have to send back an error
    const result = await Leagues.find({ LeagueCountry: countryName });
    if (result.length === 0) {
      return res.status(400).json({
        message: "This region is currently not supported by this APi"
      })
    }
    const teams = result[0].Teams;


    // find the teams from this region
    const teamsThisRegion = teams.filter((team) => {
      return team.Region == humanAdress;
    })

    if (teamsThisRegion.length >= 3) {
      return res.status(200).json(teamsThisRegion);
    }
    

  }
  catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
