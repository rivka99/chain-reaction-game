import React from "react";
import { useEffect } from "react";
import ChainRow from "./ChainRow";
import ChainWord from "./ChainWord";
import Airtable from "airtable";
import games from "./wordMapper";
import { useState, useRef } from "react";
import { differenceInHours, parseISO } from "date-fns";
import BettingPopup from "./BettingPopup";

export default function ChainReactionGame() {
  const { data, setData } = useState(null);

  let isoDate = new Date("08/01/2022").toISOString().slice(0, 10);
  console.log(isoDate);
  const apiKey = `${process.env.REACT_APP_API_KEY}`;
  const baseID = `${process.env.REACT_APP_BASE_ID}`;
  //create a new Airtable object in React
  const base = new Airtable({ apiKey: apiKey }).base(baseID);

  base("tabledata")
    .select({
      filterByFormula: `"DATESTR({Name})='${isoDate}'"`,
      view: "Grid view",
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          console.log(`"DATESTR({Name})='${isoDate}'"` + record.get("Name"));
          let newEl = {
            date: record.get("Name"),
            game: record.get("games"),
          };
          console.log(newEl);
          setData(newEl);
        });
        try {
          fetchNextPage();
        } catch {
          return;
        }
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );

  const gameArray = useRef(
    games[Math.round(Math.random() * (games.length - 1))]
  );

  const [betRound, setBetRound] = useState(true);
  const [betValue, setBetValue] = useState(0);
  const [coins, setCoins] = useState(200);
  const [gameStatus, setGameStatus] = useState(0);

  function getTimeDiff() {
    let currentDay = new Date().toISOString();
    let prevPlay = JSON.parse(localStorage.getItem("lastplayed"));
    let diff = differenceInHours(parseISO(currentDay), parseISO(prevPlay));
    console.log(currentDay + " and " + prevPlay);

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
    <div data-testid="full-game-div">
      {localStorage.getItem("lastplayed") === null || getTimeDiff() >= 24 ? (
        <div className="game-container">
          <h1 className="name" data-testid="title-header">
            Term Connection Game
          </h1>
          <div className="gameStatus" data-testid="game-status-div"></div>
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
        <div className="afterGame" data-testid="after-game">
          <h2>
            That's it for today. New game in{" "}
            <span className="diffNum">{24 - getTimeDiff()}</span> hours!
          </h2>
        </div>
      )}
    </div>
  );
}
