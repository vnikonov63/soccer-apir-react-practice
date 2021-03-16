import express from "express";
import mongoose from "mongoose";
import axios from "axios";

import Leagues from "./models/TeamsGeoTags.js";

import {
  fetchReverseGeolocation,
  fetchReverseGeolocationEngland,
} from "./externalAPIRequests/getHumanReadableAdress.js";

import distanceGivenTwoPoints from "./externalAPIRequests/distanceGivenTwoPoints.js";

const app = express();

const PORT = 3001;

mongoose.connect("mongodb://localhost:27017/GeoSoccerPlayground", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(express.json());

app.use(function (request, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

/*
The idea is the following: if we currently support this region, given by the provided point -
we proceed, otherwise we return an error. From the given Country league - we 
find the teams in this "state, local region, administrative level 1 (level 2 in case of UK).
If there are more than 3 of them we return straight away. If there are 0, 1, 2 of them we proceed.
We find three teams, whoose stadium(venue) are closest to the provided coordinates.
And we add (3 - numberOfTeamsInThisRegion) to the final return value from the API.
2 - 1, 1 - 2, 0 - 3. And return the gotten information to the final User.
*/

app.post("/getTeams", async (req, res) => {
  try {
    // find the human adress
    let humanAdress = await fetchReverseGeolocation(req.body);

    const countryName = humanAdress
      .split(",")
      [humanAdress.split(",").length - 1].trim();

    if (countryName == "UK") {
      humanAdress = await fetchReverseGeolocationEngland(req.body);
    }

    // find all the teams from this country
    const result = await Leagues.find({ LeagueCountry: countryName }).lean();
    if (result.length === 0) {
      return res.status(400).json({
        message: "This region is currently not supported by this APi",
      });
    }
    const teams = result[0].Teams;

    // find the teams from this region
    const teamsThisRegion = teams.filter((team) => {
      return team.Region == humanAdress;
    });

    if (teamsThisRegion.length >= 3) {
      const resultThisRegion = teamsThisRegion.map((team) => {
        const distanceInMeters = distanceGivenTwoPoints(
          req.body.Latitude,
          team.VenueLocation.Latitude,
          req.body.Longitude,
          team.VenueLocation.Longitude
        );
        return {
          ...team,
          Distance: distanceInMeters,
        };
      });
      return res.status(200).json(resultThisRegion);
    }
    // find the distance from the given Location to all pf the teams
    const arrayDistances = teams.map((team, index) => {
      const distanceInMeters = distanceGivenTwoPoints(
        req.body.Latitude,
        team.VenueLocation.Latitude,
        req.body.Longitude,
        team.VenueLocation.Longitude
      );
      return {
        distance: distanceInMeters,
        index: index,
      };
    });

    // sort the distances in ascending order
    arrayDistances.sort((a, b) => {
      return a.distance - b.distance;
    });

    // find three closest distances
    const firstThreeDistance = arrayDistances.slice(0, 3);

    // find three closest teams
    const closestThreeTeams = firstThreeDistance.map(({ index }) => {
      return teams[index];
    });

    // construct mega array and return only three as discused above in the description to
    // the method
    const finalResult = teamsThisRegion.concat(closestThreeTeams);
    const mostFinalResult = finalResult
      .filter((element, index) => {
        return finalResult.indexOf(element) === index;
      })
      .slice(0, 3)
      .map((team) => {
        const distanceInMeters = distanceGivenTwoPoints(
          req.body.Latitude,
          team.VenueLocation.Latitude,
          req.body.Longitude,
          team.VenueLocation.Longitude
        );
        return {
          ...team,
          Distance: distanceInMeters,
        };
      });
    //console.log(mostFinalResult);
    return res.status(200).json(mostFinalResult);
  } catch (error) {
    console.log("this is the error", error);
  }
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
