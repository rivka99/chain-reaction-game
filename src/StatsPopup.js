import React from "react";

export default function StatsPopup(props) {
  /*things to add here:
  one: at the start of the game, make a const to track starting coins, 
  at the end calculate how many coins were added during the round and add it to
  the gameStatus local storage var as 'coinsgained' at the end of the game
  
  Also, have stats/help show between games. 
  */
  let wordCols = [];
  props.gameStats[props.gameStats.length - 1].game
    .slice(1, 5)
    .forEach((word) => {
      if (props.gameStats[props.gameStats.length - 1].xguessed.includes(word)) {
        wordCols.push(
          <h4 style={{ color: "red", margin: 0, border: "solid black 1px" }}>
            {word}
          </h4>
        );
      } else {
        wordCols.push(
          <h4 style={{ color: "green", margin: 0, border: "solid black 1px" }}>
            {word}
          </h4>
        );
      }
    });
  return (
    <div className="stats-popup">
      <img
        src={require("./exiticon.png")}
        alt="exit"
        onClick={() => {
          props.setStats(false);
        }}
        id="exit-icon"
      />
      <h2>Your stats</h2>
      <div>
        On average you find{" "}
        <span id="gameWordAvg">
          {(
            props.gameStats.reduce(
              (total, next) => total + next.gameStatus,
              0
            ) / props.gameStats.length
          ).toFixed(2)}
          /4
        </span>{" "}
        words per game.
      </div>
      <div>
        <h3>Your Last Game</h3>
        <h4 style={{ margin: 0, border: "solid black 1px" }}>
          {props.gameStats[props.gameStats.length - 1].game[0]}
        </h4>
        {wordCols}
        <h4 style={{ margin: 0, border: "solid black 1px" }}>
          {props.gameStats[props.gameStats.length - 1].game[5]}
        </h4>
      </div>
    </div>
  );
}
