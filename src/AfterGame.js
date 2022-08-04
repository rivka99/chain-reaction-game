import React from "react";

export default function AfterGame(props) {
  return (
    <div>
      <h2>
        That's it for today. New game in{" "}
        <span className="diffNum">{24 - props.getTimeDiff()}</span> hours!
      </h2>
      <div className="after-game-row"></div>
    </div>
  );
}
