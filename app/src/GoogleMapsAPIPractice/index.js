import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";

import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import mapStyles from "./mapsStyles";

import ChooseFromThreeTeams from "./ChooseFromThreeTeams";

const libraries = ["places"];
const mapContainerStyle = {
  width: "80vw",
  height: "65vh",
};

const center = {
  lat: 53.241505,
  lng: 50.221245,
};

const options = {
  styles: mapStyles,
  disableDefaultUi: true,
  zoomControl: true,
};

const GoogleAPIMainPage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 25px;
  margin-bottom: 50px;
`;

function GoogleMapsAPIPractice() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [teams1, setTeams1] = useState([]);
  const [teams2, setTeams2] = useState([]);
  const [teamCount, setTeamCount] = useState(0);
  const [team1, setTeam1] = useState({});
  const [team2, setTeam2] = useState({});
  const [chosenPoint, setChosenPoint] = useState({});
  const [visible, setVisible] = useState(false);

  if (loadError) {
    return "Error loading map";
  }
  if (!isLoaded) {
    return "Loading Maps";
  }

  return (
    <GoogleAPIMainPage>
      <div>
        {visible &&
          (teamCount === 1 ? (
            <ChooseFromThreeTeams
              teams={teams1}
              setVisible={setVisible}
              team1={setTeam1}
            />
          ) : teamCount === 2 ? (
            <ChooseFromThreeTeams
              teams={teams2}
              setVisible={setVisible}
              team1={setTeam2}
            />
          ) : null)}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={3}
          center={center}
          options={options}
          onClick={async (event) => {
            if (teamCount >= 2 || visible) {
              return;
            }
            const Latitude = event.latLng.lat();
            const Longitude = event.latLng.lng();
            const response = await axios({
              method: "post",
              url: "http://localhost:3001/getTeams",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              data: JSON.stringify({
                Latitude: Latitude,
                Longitude: Longitude,
              }),
            });
            if (teamCount === 0) {
              setTeams1(response.data);
            }
            if (teamCount === 1) {
              setTeams2(response.data);
            }
            setTeamCount((prev) => {
              return prev + 1;
            });

            setVisible(true);
            setChosenPoint({
              Latitude: event.latLng.lat(),
              Longitude: event.latLng.lng(),
            });
            console.log(response);
          }}
        >
          {visible &&
            (teamCount === 1 ? teams1 : teamCount === 2 ? teams2 : []).map(
              (team) => {
                return (
                  <>
                    <Marker
                      key={uuidv4()}
                      icon={{
                        url: team.Logo,
                        scaledSize: new window.google.maps.Size(60, 60),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                      }}
                      position={{
                        lat: team.VenueLocation.Latitude,
                        lng: team.VenueLocation.Longitude,
                      }}
                    />
                    <InfoWindow
                      position={{
                        lat: team.VenueLocation.Latitude,
                        lng: team.VenueLocation.Longitude,
                      }}
                    >
                      <div>
                        <h2>
                          {Math.round(team.Distance)} meters away from provided
                          point
                        </h2>
                      </div>
                    </InfoWindow>
                  </>
                );
              }
            )}
          {visible && (teamCount === 1 || teamCount === 2) && (
            <Marker
              key={uuidv4()}
              position={{
                lat: +chosenPoint.Latitude,
                lng: +chosenPoint.Longitude,
              }}
            />
          )}
        </GoogleMap>
      </div>
    </GoogleAPIMainPage>
  );
}

export default GoogleMapsAPIPractice;
