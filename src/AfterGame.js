import React from "react";
import HelpPopup from "./HelpPopup";
import StatsPopup from "./StatsPopup";
export default function AfterGame(props) {
  return (
    <div>
      <h2>
        That's it for today. New game in{" "}
        <span className="diffNum">{24 - props.getTimeDiff()}</span> hours!
      </h2>
      <div className="after-game-row">
        <img
          src={require("./questionicon.png")}
          alt="instructions"
          onClick={() => {
            props.setHelp(true);
          }}
          id="help-icon-after"
        />
        <img
          src={require("./statsicon.png")}
          alt="help"
          onClick={() => {
            props.setStats(true);
          }}
          id="stats-icon"
        />
        {props.help && <HelpPopup help={props.help} setHelp={props.setHelp} />}
        {props.stats && (
          <StatsPopup
            stats={props.stats}
            setStats={props.setStats}
            gameStats={props.gameStats}
          />
        )}
      </div>
    </div>
  );
}
