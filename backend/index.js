import express from "express";
import mongoose from "mongoose";
import axios from "axios";

import Leagues from "./models/TeamsGeoTags.js";

import fetchReverseGeolocation from "./externalAPIRequests/getHumanReadableAdress.js";


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
    const humanAdress = await fetchReverseGeolocation(req.body);
    const countryName = humanAdress.split(',')[1].trim();
    const result = await Leagues.find({ LeagueCountry: countryName });
    const teams = result[0].Teams;
    res.json(teams);
  }
  catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
