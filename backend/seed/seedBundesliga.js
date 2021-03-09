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
