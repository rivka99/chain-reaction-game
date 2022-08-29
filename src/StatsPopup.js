import React from "react";
import ShareButton from "./ShareButton";

export default function StatsPopup(props) {
  let gamesLength = props.gameStats.length;
  let today = new Date();
  let shareText = `${
    today.getMonth() + 1
  }-${today.getDate()}-${today.getFullYear()}      ${
    props.gameStats[props.gameStats.length - 1].gameStatus
  }/4\n⬛⬛⬛⬛⬛\n`;
  let wordCols = [];
  if (gamesLength > 0) {
    props.gameStats[props.gameStats.length - 1].game
      .slice(1, 5)
      .forEach((word) => {
        if (
          props.gameStats[props.gameStats.length - 1].xguessed.includes(word)
        ) {
          shareText += `🟥🟥🟥🟥🟥\n`;
          wordCols.push(
            <h5 style={{ color: "red", margin: 0, border: "solid black 1px" }}>
              {word}
            </h5>
          );
        } else {
          shareText += `🟩🟩🟩🟩🟩\n`;
          wordCols.push(
            <h5
              style={{ color: "green", margin: 0, border: "solid black 1px" }}
            >
              {word}
            </h5>
          );
        }
      });
    shareText += `⬛⬛⬛⬛⬛\n${
      props.gameStats[props.gameStats.length - 1].moves
    } moves\n${
      props.gameStats[props.gameStats.length - 1].totalCoins
    } coins left.`;
  }

  if (!gamesLength) {
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
        <h3>Your Stats:</h3>
        <p>There are no stats to show since you haven't completed a game.</p>
      </div>
    );
  }

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
      <h3>Your stats</h3>
      <div id="found-stat">
        You have{" "}
        <span id="gameWordAvg">
          {props.gameStats[props.gameStats.length - 1].totalCoins}
        </span>{" "}
        coins.
        <br></br> <br></br>
        On average you found{" "}
        <span id="gameWordAvg">
          {(
            props.gameStats.reduce(
              (total, next) => total + next.gameStatus,
              0
            ) / props.gameStats.length
          ).toFixed(2)}
          /4
        </span>{" "}
        correct words over {props.gameStats.length} games.<br></br>
        <br></br>
        The highest number of coins you have gained in a single game was{" "}
        <span id="gameWordAvg">
          {props.gameStats[props.gameStats.length - 1].highestCoins}
        </span>{" "}
        coins.
        <br></br> <br></br>
        The highest number of coins you have ever had at one time was{" "}
        <span id="gameWordAvg">
          {props.gameStats[props.gameStats.length - 1].highestTotalCoins}{" "}
        </span>{" "}
        coins.
      </div>
      <div>
        <h4>Your Last Game:</h4>
        <h5
          style={{
            margin: 0,
            border: "solid black 1px",
            backgroundColor: "#dce6df",
          }}
        >
          {props.gameStats[props.gameStats.length - 1].game[0]}
        </h5>
        {wordCols}
        <h5
          style={{
            margin: 0,
            border: "solid black 1px",
            backgroundColor: "#dce6df",
          }}
        >
          {props.gameStats[props.gameStats.length - 1].game[5]}
        </h5>
      </div>
      <ShareButton text={shareText} />
    </div>
  );
}
