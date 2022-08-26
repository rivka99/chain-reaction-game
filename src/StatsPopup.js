import React from "react";

export default function StatsPopup(props) {
  return (
    <div className="stats-popup">
      <img
        src={require("./statsicon.png")}
        alt="statistics"
        onClick={() => {
          props.setStats(false);
        }}
        id="stats-icon"
      />
      <h2>Your stats</h2>
    </div>
  );
}
