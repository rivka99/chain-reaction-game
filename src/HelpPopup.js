import React from "react";

export default function HelpPopup(props) {
  return (
    <div className="help-popup">
      <img
        src={require("./exiticon.png")}
        alt="instructions"
        onClick={() => {
          props.setHelp(false);
        }}
        id="exit-icon"
      />
      <h2>How to play</h2>
      <h5>
        The goal of the game is to connect one compound word to another, in
        order.
      </h5>
      <div className="help-bet-images">
        <img
          src={require("./2guessboard.png")}
          alt="board with 2 correct guesses"
          id="guessboard2"
        />
        <img
          src={require("./3correct guesses.png")}
          alt="board with 3 correct guesses"
          id="guessboard3"
        />
      </div>
      <h5>
        Before you can start guessing, you have a chance to bet.<br></br>A bet
        is your guess of how well you think you will do each game.
      </h5>
      <h5>
        If your starting word is milk, then you might want to try guessing "jug"
        or "man"
      </h5>
      <h5>
        If you get the word right, your bet doubles and you will have increased
        coins with which to bet.
      </h5>
      <h5>
        If you get the word wrong, you lose your coins. When you lose all your
        coins the game ends, and you can try again tomorrow!
      </h5>
    </div>
  );
}
