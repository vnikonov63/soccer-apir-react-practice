import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import League from "../models/TeamsGeoTags.js";

dotenv.config();

const db = mongoose.connect("mongodb://localhost:27017/GeoSoccerPlayground", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const API_GET_SEASON_BUNDESLIGA = `https://soccer.sportmonks.com/api/v2.0/leagues/384?api_token=${process.env.SPORTMONKS_API_CODE}`;
async function getSeasonId() {
  try {
    const response = await axios.get(API_GET_SEASON_BUNDESLIGA);
    return response.data.data.current_season_id;
  } catch (error) {
    console.error(error);
  }
}

function getAPIGetTeamsToken(season_id) {
  return `https://soccer.sportmonks.com/api/v2.0/teams/season/${season_id}?api_token=${process.env.SPORTMONKS_API_CODE}&include=venue`;
}
async function getTeamsThisSeason(season_id) {
  try {
    const response = await axios.get(getAPIGetTeamsToken(season_id));
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchReverseGeolocation(positionInfo) {
  const apiAdress = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${positionInfo.Latitude},${positionInfo.Longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  const response = await axios.get(apiAdress);
  const humanReadable = response.data.results.find((adress) => {
    return adress.types.includes("administrative_area_level_1");
  });
  return humanReadable.formatted_address;
}

async function getFormattedData() {
  const currentSeason = await getSeasonId();
  const teams = await getTeamsThisSeason(currentSeason);
  const teamsFiltered = teams.map((team) => {
    const splitted = team.venue.data.coordinates.split(",");
    return {
      Logo: team.logo_path,
      TeamName: team.name,
      TeamId: team.id,
      VenueId: team.venue_id,
      VenueName: team.venue.data.name,
      VenueLocation: {
        Latitude: +splitted[0],
        Longitude: +splitted[1],
      },
    };
  });

  const getLocationsName = async () => {
    return Promise.all(
      teamsFiltered.map((team) => {
        try {
          return fetchReverseGeolocation(team.VenueLocation);
        } catch (error) {
          console.error(error);
          console.log(team);
        }
      })
    );
  };

  const locations = await getLocationsName();
  const teamsFilteredFinal = teamsFiltered.map((team, index) => {
    return {
      ...team,
      Region: locations[index],
    };
  });
  return teamsFilteredFinal;
}

db.then(async () => {
  const formattedData = await getFormattedData();
  const finalData = {
    LeagueName: "Serie A",
    LeagueId: 384,
    LeagueCountry: "Italy",
    Teams: formattedData,
  };
  const SerieA = new League(finalData).save();
});
