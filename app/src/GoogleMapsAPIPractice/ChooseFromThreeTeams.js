import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ChooseFromThreeTeams({ teams, setVisible, teamSetter }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100, y: 100 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0, x: 100, y: 100 }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2>Click on the logo to choose a team</h2>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {teams.map((team) => {
              return (
                <div
                  className="card"
                  style={{
                    padding: "15px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    teamSetter((prev) => {
                      return [...prev, team];
                    });
                    setVisible(false);
                  }}
                >
                  <div className="card-image">
                    <img
                      style={{ width: "150px", height: "150px" }}
                      alt={"team-logo"}
                      src={team.Logo}
                    />
                  </div>
                  <h2>{team.TeamName}</h2>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ChooseFromThreeTeams;
