import mongoose from "mongoose";

const Leagues = new mongoose.Schema({
  LeagueName: String,
  LeagueId: Number,
  LeagueCountry: String,
  Teams: [
    {
      TeamName: String,
      TeamId: Number,
      VenueName: String,
      VenueLocation: {
        Latitude: Number,
        Longitude: Number,
      },
    },
  ],
});

const modelLeague = mongoose.model("Leagues", Leagues);

export default modelLeague;
