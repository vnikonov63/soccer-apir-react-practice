import mongoose from "mongoose";

const Leagues = new mongoose.Schema({
  LeagueName: String,
  LeagueId: Number,
  LeagueCountry: String,
  Teams: [
    {
      Logo: String,
      TeamName: String,
      TeamId: Number,
      VenueName: String,
      VenueId: Number,
      VenueLocation: {
        Latitude: Number,
        Longitude: Number,
      },
      Region: String,
    },
  ],
});

const modelLeague = mongoose.model("Leagues", Leagues);

export default modelLeague;
