import React from "react";
import ChainRow from "./ChainRow";
import ChainWord from "./ChainWord";
import games from "./wordMapper";
import { useState, useRef } from "react";
import { differenceInHours, parseISO } from "date-fns";
import BettingPopup from "./BettingPopup";

export default function ChainReactionGame() {
  const gameArray = useRef(
    games[Math.round(Math.random() * (games.length - 1))]
  );

  let date = new Date();
  const [betRound, setBetRound] = useState(true);
  const [betValue, setBetValue] = useState(0);
  const [coins, setCoins] = useState(200);
  const [gameStatus, setGameStatus] = useState(0);
  const [correctLetters, setCorrectLetters] = useState("");

  function getTimeDiff() {
    let currentDay = new Date().toISOString();
    let prevPlay = JSON.parse(localStorage.getItem("lastplayed"));
    let diff = differenceInHours(parseISO(currentDay), parseISO(prevPlay));
    return diff;
  }

  function disableForm() {
    let formInputs = document.querySelectorAll(".openRow");
    for (let i = 0; i < formInputs.length; i++) {
      formInputs[i].disabled = true;
    }
  }

  function enableForm() {
    let formInputs = document.querySelectorAll(".openRow");
    for (let i = 0; i < formInputs.length; i++) {
      formInputs[i].disabled = false;
    }
  }

  return (
    <div>
      {localStorage.getItem("lastplayed") === null || getTimeDiff() >= 24 ? (
        <div className="game-container">
          <h1 className="name">Term Connection Game</h1>
          <div className="gameStatus"></div>
          <div>
            <ChainWord word={gameArray.current[0]} />
            {gameArray.current.slice(1, 5).map((elWord) => (
              <ChainRow
                key={elWord}
                word={elWord}
                betRound={betRound}
                setBetRound={setBetRound}
                disableForm={disableForm}
                setCoins={setCoins}
                betValue={betValue}
                coins={coins}
                correctLetters={correctLetters}
                setCorrectLetters={setCorrectLetters}
                gameStatus={gameStatus}
                setGameStatus={setGameStatus}
              />
            ))}
            <ChainWord word={gameArray.current[5]} />
          </div>
          {betRound && coins > 0 && (
            <BettingPopup
              betRound={betRound}
              setBetRound={setBetRound}
              coins={coins}
              setCoins={setCoins}
              enableForm={enableForm}
              betValue={betValue}
              setBetValue={setBetValue}
            />
          )}
        </div>
      ) : (
        <div className="afterGame">
          <h2>
            That's it for today. New game in{" "}
            <span className="diffNum">{24 - getTimeDiff()}</span> hours!
          </h2>
        </div>
      )}
    </div>
  );
}
