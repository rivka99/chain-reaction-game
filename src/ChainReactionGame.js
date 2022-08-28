import React from "react";
import { useEffect } from "react";
import ChainRow from "./ChainRow";
import ChainWord from "./ChainWord";
import Airtable from "airtable";
import { useState } from "react";
import { differenceInHours, parseISO } from "date-fns";
import BettingPopup from "./BettingPopup";
import AfterGame from "./AfterGame";
import Loader from "./Loader";
import HelpPopup from "./HelpPopup";
import HintBox from "./HintBox";
import StatsPopup from "./StatsPopup";

export default function ChainReactionGame() {
  let gameStats = localStorage.getItem("gamestats")
    ? JSON.parse(localStorage.getItem("gamestats"))
    : [];
  const [betRound, setBetRound] = useState(false);
  const [betValue, setBetValue] = useState(0);
  const [
    coins = !gameStats.length
      ? 200
      : gameStats[gameStats.length - 1].totalCoins >= 200
      ? gameStats[gameStats.length - 1].totalCoins
      : 200,
    setCoins,
  ] = useState();
  const [data, setData] = useState(null);
  const [gameArray, setGameArray] = useState([]);
  const [gameStatus, setGameStatus] = useState(0);
  const [help, setHelp] = useState(false);
  const [stats, setStats] = useState(false);
  const [guessClicked, setGuessClicked] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [hintWord, setHintWord] = useState("hello");

  let isoDate = new Date().toLocaleDateString();
  const apiKey =
    `${process.env.REACT_APP_API_KEY}` || `${config.REACT_APP_API_KEY}`;
  const baseID =
    `${process.env.REACT_APP_BASE_ID}` || `${config.REACT_APP_BASE_ID}`;
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
        function page(records) {
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
    return (
      <div className="loader-container" data-testid="loader-container">
        <Loader />
      </div>
    );
  }
  return (
    <div data-testid="full-game-div">
      {localStorage.getItem("lastplayed") === null || getTimeDiff() >= 24 ? (
        <div className="game-container">
          <div className="header-row">
            <h1 className="name" data-testid="title-header">
              LinkSixth
            </h1>
            <img
              src={require("./questionicon.png")}
              alt="instructions"
              onClick={() => {
                setHelp(true);
              }}
              id="help-icon"
            />
            <img
              src={require("./statsicon.png")}
              alt="help"
              onClick={() => {
                setStats(true);
              }}
              id="stats-icon"
            />
          </div>
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
                guessClicked={guessClicked}
                setGuessClicked={setGuessClicked}
                gameStats={gameStats}
                gameArray={gameArray}
                showInfo={showInfo}
                setShowInfo={setShowInfo}
                setHintWord={setHintWord}
              />
            ))}
            <ChainWord word={gameArray[5]} />
          </div>
          <div>
            <HintBox
              showInfo={showInfo}
              setShowInfo={setShowInfo}
              hintWord={hintWord}
            />
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
              gameStatus={gameStatus}
            />
          )}
          {help && <HelpPopup help={help} setHelp={setHelp} />}
          {stats && (
            <StatsPopup
              stats={stats}
              setStats={setStats}
              gameStats={gameStats}
            />
          )}
        </div>
      ) : (
        <div className="afterGame" data-testid="after-game">
          <AfterGame
            getTimeDiff={getTimeDiff}
            help={help}
            setHelp={setHelp}
            stats={stats}
            setStats={setStats}
            gameStats={gameStats}
            gameStatus={gameStatus}
          />
        </div>
      )}
    </div>
  );
}
