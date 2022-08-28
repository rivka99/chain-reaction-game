import React from "react";
import { useState, useEffect } from "react";
export default function ChainRow(props) {
  const [correctLetters, setCorrectLetters] = useState("");
  function onRowClick() {
    if (props.guessClicked === 0) {
      props.setBetRound(true);
    }
    props.setGuessClicked(props.guessClicked + 1);
  }
  function inputChange() {
    const inputRow = document.querySelector("#rowInput" + props.word);
    //if they've never played yet, don't show bet popup until they click a row

    //when part of the input is being typed and is right, turns blue
    if (
      inputRow.value.toLowerCase() ===
      props.word.slice(0, inputRow.value.length)
    ) {
      inputRow.style.color = "green";
      setCorrectLetters(
        props.word.slice(0, inputRow.value.length).toLowerCase()
      );
      //when full input is correct
      if (inputRow.value.toLowerCase() === props.word) {
        inputRow.disabled = true;
        let newVal = props.betValue * 1 + props.coins * 1;
        props.setCoins(newVal);
        //if the game is over notify player
        if (props.gameStatus === 3) {
          const gameStatEl1 = document.createElement("h2");
          props.setGameStatus(props.gameStatus + 1);
          inputRow.classList.remove("openRow");
          inputRow.classList.remove("notGuessed");
          gameStatEl1.textContent = `Awesome, YOU WON! 4/4 correct!`;
          document.querySelector(".gameStatus").appendChild(gameStatEl1);
          setTimeout(function () {
            setPlayed(newVal);
          }, 2000);
        } else {
          props.setGameStatus(props.gameStatus + 1);
          inputRow.classList.remove("openRow");
          inputRow.classList.remove("notGuessed");
          setTimeout(function () {
            props.setBetRound(true);
          }, 500);
        }
      }
    } else {
      //when user guessed wrong can't bet anymore
      let diffVal = props.coins - props.betValue;
      props.setCoins(diffVal);
      if (diffVal < 1) {
        inputRow.style.color = "red";
        props.disableForm();
        giveAnswers("red");
        const gameStatEl = document.createElement("h2");
        gameStatEl.textContent = `Game Over, you got ${props.gameStatus}/4 correct`;
        document.querySelector(".gameStatus").appendChild(gameStatEl);
        setPlayed(diffVal);
      } else {
        //when user still has coins to bet
        inputRow.style.color = "red";
        props.disableForm();
        (async () => {
          await runAnswerHint(function () {
            correctLetters !== ""
              ? (inputRow.value = correctLetters)
              : (inputRow.value = props.word[0]);
            inputRow.style.color = "green";
          });
          await runAnswerHint(function () {
            props.setBetRound(true);
          });
        })();
      }
    }
  }
  function setPlayed(coinValue) {
    let currentTime = new Date();
    let formInputs = document.querySelectorAll(".notGuessed");
    let notGuessed = [];
    for (let i = 0; i < formInputs.length; i++) {
      notGuessed.push(formInputs[i].value);
    }
    localStorage.setItem("lastplayed", JSON.stringify(currentTime));

    let coinDiff = props.gameStats.length
      ? coinValue - props.gameStats[props.gameStats.length - 1].totalCoins
      : coinValue - 200;
    // let highestCoins = props.gameStats[props.gameStats.length - 1].highestTotalCoins
    let totalHighestCoins = props.gameStats.length
      ? coinValue >
        props.gameStats[props.gameStats.length - 1].highestTotalCoins
        ? coinValue
        : props.gameStats[props.gameStats.length - 1].highestTotalCoins
      : coinValue;
    let addedCoins = props.gameStats.length
      ? coinDiff > props.gameStats[props.gameStats.length - 1].highestCoins
        ? coinDiff
        : props.gameStats[props.gameStats.length - 1].highestCoins
      : coinDiff;
    props.gameStats.push({
      gameStatus: props.gameStatus,
      game: props.gameArray,
      xguessed: notGuessed,
      totalCoins: coinValue,
      highestCoins: addedCoins,
      highestTotalCoins: totalHighestCoins,
    });
    localStorage.setItem("gamestats", JSON.stringify(props.gameStats));
  }

  function giveAnswers(color) {
    let formInputs = document.querySelectorAll(".notGuessed");
    for (let i = 0; i < formInputs.length; i++) {
      formInputs[i].style.color = color;
      formInputs[i].value =
        formInputs[i].id.slice(8, formInputs[i].id.length) + "";
    }
  }

  const runAnswerHint = (delayedFunction) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        delayedFunction();
        resolve(true);
      }, 400)
    );
  };

  return (
    <div>
      <input
        role="chain-row"
        type="text"
        className="rowInput openRow notGuessed"
        id={`rowInput${props.word}`}
        onChange={inputChange}
        onClick={onRowClick}
      ></input>
    </div>
  );
}
