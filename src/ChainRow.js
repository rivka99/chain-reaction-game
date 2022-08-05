import React from "react";
import { useState } from "react";
export default function ChainRow(props) {
  const [correctLetters, setCorrectLetters] = useState("");
  function colorChange() {
    const inputRow = document.querySelector("#rowInput" + props.word);
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
        props.setCoins(props.coins + props.betValue * 2);
        //if the game is over notify player
        if (props.gameStatus === 3) {
          const gameStatEl1 = document.createElement("h2");
          gameStatEl1.textContent = `Awesome, YOU WON! 4/4 correct!`;
          document.querySelector(".gameStatus").appendChild(gameStatEl1);
          setTimeout(function () {
            setPlayed();
          }, 2000);
        } else {
          props.setGameStatus(props.gameStatus + 1);
          inputRow.classList.remove("openRow");
          setTimeout(function () {
            props.setBetRound(true);
          }, 500);
        }
      }
    } else {
      //when user guessed wrong can't bet anymore
      if (props.coins < 10) {
        inputRow.style.color = "red";
        props.disableForm();
        giveAnswers("purple");
        const gameStatEl = document.createElement("h2");
        gameStatEl.textContent = `Game Over, you got ${props.gameStatus}/4 correct`;
        document.querySelector(".gameStatus").appendChild(gameStatEl);
        setPlayed();
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
  function setPlayed() {
    let currentTime = new Date();
    localStorage.setItem("lastplayed", JSON.stringify(currentTime));
  }

  function giveAnswers(color) {
    let formInputs = document.querySelectorAll(".rowInput");
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
        type="text"
        className="rowInput openRow"
        id={`rowInput${props.word}`}
        onChange={colorChange}
      ></input>
    </div>
  );
}
