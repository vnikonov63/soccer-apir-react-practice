# soccer-apir-react-practice
Historical data about soccer via map as a Controller.

To start this project you need to have an API key from Google Cloud, as well as SportMonks API key and you need to put them inside the .env file. For the frontend part (React) add REACT_APP_ at the beginning of the process variable. Currently, the application supports ten leagues (England, Germany, France, Spain, Italy, Portugal, Russia, Belgium, Austria, Netherlands).

Then use the following commands: 
```
cd backend
npm start
cd ..
cd app
yarn start
```

## Summary
Have you ever spend hours looking at maps, trying to find something interesting? I did. So with this project, you can press on a map and you will have the closest soccer teams. The team's location is determined by its venue(stadium). You can choose a team of interest, and after you repeat this process twice you would have two chosen teams, about which you can gather information describing their last games. 

## How it works.
When you press on a map, I get the latitude and longitude of that point - then I send this information to the backend. When the backend receives data I make a request to the geocoding API and receive the name of the country where the point is located. I also receive information about "region" (an administrative entity within the country). Then I make the call to the database, which holds information about the team in the top soccer league in the demanded country. (I use sportMonks API to seed my database with information in the format I need, and I do it in advance). I look for teams in the same region as the provided latitude and longitude. If I find more than 3 of those I run a function, which determines the distance between two points (provided point and team venue location) and sends it to the frontend. If a region has less than 3 teams, I run a function that determines the closest teams from the provided point and adds them to respond to the total of three teams. On the frontend, I show these teams and let the user choose those of interest. After two final teams are chosen I make an API call to SportMonks API to gather information about games between two teams.

## Demo
You can press on a point and get closest teams.
* ![Get closest teams](https://i.ibb.co/z4mpGSr/ezgif-6-b1be4cc9b465.gif)

You can choose a team of interest.
* ![Choose a team](https://i.ibb.co/Wk8SSB2/ezgif-6-dc3ac2c2c566.gif)

You can compare two teams and get info about their last games.
* ![Compare two teams](https://i.ibb.co/b655jDv/ezgif-6-96cb35c80b3b.gif)

## Technologies used
* MongoDb - DataBase
* React - Frontend
* Express - Backend
* React Google Maps - help with the google API
* Postman - to test my API endpoints
* MongoDb Compass - help with DataBase management
