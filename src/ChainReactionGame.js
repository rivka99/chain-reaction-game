import React from "react"
import ChainRow from "./ChainRow"
import ChainWord from "./ChainWord"
import games from "./wordMapper"

export default function ChainReactionGame(){
    const gameArray = games[Math.round(Math.random()*(games.length-1))]
    console.log(gameArray)
    return(
        <div>
            <h1>Chain Reaction Game</h1>
            <div>
                <ChainWord word = {gameArray[0]}/>
                <ChainRow word  = {gameArray[1]}/>
                <ChainRow word  = {gameArray[2]}/>
                <ChainRow word  = {gameArray[3]}/>
                <ChainRow word  = {gameArray[4]}/>
                <ChainWord word = {gameArray[5]}/>
            </div>
        </div>
    )
}