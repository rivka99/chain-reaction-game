import React from "react";
import { useEffect } from "react";
import ChainRow from "./ChainRow";
import ChainWord from "./ChainWord";
import Airtable from "airtable";
import games from "./wordMapper";
import { useState, useRef } from "react";
import { differenceInHours, parseISO } from "date-fns";
import BettingPopup from "./BettingPopup";
import AfterGame from "./AfterGame";

export default function ChainReactionGame() {
  const [gameArray, setGameArray] = useState([]);
  const [betRound, setBetRound] = useState(true);
  const [betValue, setBetValue] = useState(0);
  const [coins, setCoins] = useState(200);
  const [gameStatus, setGameStatus] = useState(0);

  const [data, setData] = useState(null);
  let isoDate = new Date().toLocaleDateString();
  const apiKey = `${process.env.REACT_APP_API_KEY}`;
  const baseID = `${process.env.REACT_APP_BASE_ID}`;
  const base = new Airtable({ apiKey: apiKey }).base(baseID);

  useEffect(() => {
    async function fetchData() {
      await getGame();
    }
    fetchData();
  }, []);
  const getGame = () => {
    base("tabledata")
      .select({
        filterByFormula: `{Name} = "${isoDate}"`,
        view: "Grid view",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            let newEl = {
              date: record.get("Name"),
              game: record.get("games"),
            };
            setData(newEl);
            setGameArray(newEl.game);
          });
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  };

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
  if (!data) {
    return <div className="App">Loading...</div>;
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
            <ChainWord word={gameArray[0]} />
            {gameArray.slice(1, 5).map((elWord) => (
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
            <ChainWord word={gameArray[5]} />
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
          <AfterGame getTimeDiff={getTimeDiff} />
        </div>
      )}
    </div>
  );
}
