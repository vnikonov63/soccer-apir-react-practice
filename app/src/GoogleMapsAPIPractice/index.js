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
import TeamsList from "./TeamsList";

const libraries = ["places"];
const mapContainerStyle = {
  width: "80vw",
  height: "55vh",
};

const center = {
  lat: 50,
  lng: 25,
};

const options = {
  styles: mapStyles,
  disableDefaultUi: true,
  zoomControl: true,
};

const GoogleAPIMainPage = styled.div`
  display: flex;
  flex-direction: column;
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
  const [teams, setTeams] = useState([]);
  const [chosenPoint, setChosenPoint] = useState({});
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);

  if (loadError) {
    return "Error loading map";
  }
  if (!isLoaded) {
    return "Loading Maps";
  }

  return (
    <GoogleAPIMainPage>
      {error && <h3>Sorry, but his region is not yet supported</h3>}
      <div>
        {visible &&
          (teamCount === 1 ? (
            <ChooseFromThreeTeams
              teams={teams1}
              setVisible={setVisible}
              teamSetter={setTeams}
            />
          ) : teamCount === 2 ? (
            <ChooseFromThreeTeams
              teams={teams2}
              setVisible={setVisible}
              teamSetter={setTeams}
            />
          ) : null)}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={4}
          center={center}
          options={options}
          onClick={async (event) => {
            if (teamCount >= 2 || visible) {
              return;
            }
            const Latitude = event.latLng.lat();
            const Longitude = event.latLng.lng();
            try {
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
              setError(false);
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
            } catch (error) {
              setError(true);
              return;
            }
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
                        <h4>
                          {Math.round(team.Distance)} meters away from provided
                          point
                        </h4>
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
        {teams.length !== 0 && <TeamsList teams={teams} />}
      </div>
    </GoogleAPIMainPage>
  );
}

export default GoogleMapsAPIPractice;
