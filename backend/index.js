import express from "express";
import mongoose from "mongoose";
import axios from "axios";

import Leagues from "./models/TeamsGeoTags.js";

const app = express();

const PORT = 3001;

const db = mongoose.connect("mongodb://localhost:27017/GeoSoccerPlayground", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

db.then(() => {
  const leagues = new Leagues({
    LeagueName: "Bundesliga",
    LeagueId: 1,
    LeagueCountry: "Germany",
    Teams: [
      {
        TeamName: "Bavaria",
        TeamId: 1,
        VenueName: "Bavaria Stadium",
        VenueLocation: {
          Latitude: 53.555,
          Longitude: 54.899,
        },
      },
      {
        TeamName: "Dortmund",
        TeamId: 2,
        VenueName: "Dortmund Stadium",
        VenueLocation: {
          Latitude: 59.555,
          Longitude: 61.899,
        },
      },
    ],
  }).save();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/getTeams", (req, res) => {
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
