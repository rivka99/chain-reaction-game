import React from "react";

export default function BettingPopup(props) {
  function onBetSubmit() {
    let bet = document.querySelector('input[name="betOptions"]:checked').value;
    let betCommand = document.querySelector(".betCommand");
    props.setBetValue(bet);

    if (props.coins >= parseInt(bet)) {
      betCommand.textContent = "Make a bet";
      betCommand.style.color = "black";
      props.setCoins(props.coins - bet);
      props.setBetRound(false);
      props.enableForm();
    } else {
      betCommand.textContent = "You cannot afford this bet";
      betCommand.style.color = "red";
    }
  }

  return (
    <div className="popup-div">
      <p className="betCommand">Make a bet</p>
      <h3>You Have {props.coins} Coins left to bet!</h3>
      <div>
        <form
          className="radio-toolbar"
          onSubmit={(e) => {
            e.preventDefault();
            onBetSubmit();
          }}
        >
          <input
            className="radio-toolbar"
            type="radio"
            id="10"
            name="betOptions"
            value="10"
          />
          <label for="10">10</label>

          <input
            className="radio-toolbar"
            type="radio"
            id="20"
            name="betOptions"
            value="20"
          />
          <label for="20">20</label>

          <input
            className="radio-toolbar"
            type="radio"
            id="40"
            name="betOptions"
            value="40"
          />
          <label for="40">40</label>

          <input
            className="radio-toolbar"
            type="radio"
            id="80"
            name="betOptions"
            value="80"
          />
          <label for="80">80</label>

          <input
            className="radio-toolbar"
            type="radio"
            id="100"
            name="betOptions"
            value="100"
          />
          <label for="100">100</label>

          <input type="submit" className="submit-btn" value="SUBMIT"></input>
        </form>
      </div>
    </div>
  );
}
