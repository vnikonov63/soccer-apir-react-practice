import express from "express";
import axios from "axios";

const app = express();

const PORT = 3001;

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
