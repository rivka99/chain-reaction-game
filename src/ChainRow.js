import React from "react";

export default function ChainRow(props) {
  function colorChange() {
    const inputRow = document.querySelector("#rowInput" + props.word);
    //when part of the input is being typed and is right, turns blue
    if (
      inputRow.value.toLowerCase() ===
      props.word.slice(0, inputRow.value.length)
    ) {
      inputRow.style.color = "green";
      //when full input is correct
      if (inputRow.value.toLowerCase() === props.word) {
        inputRow.disabled = true;
        props.setCoins(props.coins + props.betValue * 2);
        //if the game is over notify player
        if (props.gameStatus === 3) {
          const gameStatEl1 = document.createElement("h2");
          gameStatEl1.textContent = `Awesome, YOU WON!`;
          document.querySelector(".gameStatus").appendChild(gameStatEl1);
          setPlayed();
        } else {
          props.setGameStatus(props.gameStatus + 1);
          inputRow.classList.remove("openRow");
          props.setBetRound(true);
        }
      }
    } else {
      //when user guessed wrong can't bet anymore
      if (props.coins < 10) {
        inputRow.style.color = "red";
        props.disableForm();
        const gameStatEl = document.createElement("h2");
        gameStatEl.textContent = `Game Over, you got ${props.gameStatus}/4 correct`;
        document.querySelector(".gameStatus").appendChild(gameStatEl);
        setPlayed();
      } else {
        //when user still has coins to bet
        inputRow.style.color = "red";
        props.disableForm();
        setTimeout(function () {
          inputRow.value = "";
          props.setBetRound(true);
        }, 400);
      }
    }
  }
  function setPlayed() {
    let currentTime = new Date();
    localStorage.setItem("lastplayed", JSON.stringify(currentTime));
  }

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
