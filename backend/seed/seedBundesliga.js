import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = mongoose.connect("mongodb://localhost:27017/GeoSoccerPlayground", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const API_GET_SEASON_BUNDESLIGA = `https://soccer.sportmonks.com/api/v2.0/leagues/82?api_token=${process.env.SPORTMONKS_API_CODE}`;
async function getSeasonId() {
  try {
    const response = await axios.get(API_GET_SEASON_BUNDESLIGA);
    console.log(response.data.data.current_season_id);
    return response.data.data.current_season_id;
  } catch (error) {
    console.error(error);
  }
}

function getAPIGetTeamsToken(season_id) {
  return `https://soccer.sportmonks.com/api/v2.0/teams/season/${season_id}?api_token=${process.env.SPORTMONKS_API_CODE}`;
}
async function getTeamsThisSeason(season_id) {
  try {
    const response = await axios.get(getAPIGetTeamsToken(season_id));
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

function getAPIGetVenueToken(venue_id) {
  return `https://soccer.sportmonks.com/api/v2.0/venues/${venue_id}?api_token=${process.env.SPORTMONKS_API_CODE}`;
}
async function getVenueInfo(venue_id) {
  try {
    const response = await axios.get(getAPIGetVenueToken(venue_id));
    console.log(response.data.data.coordinates);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}
getVenueInfo(2138);

async function getFormattedData() {}

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
