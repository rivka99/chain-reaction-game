import React from "react";

export default function ChainRow(props){
    function colorChange(){
      const inputRow = document.querySelector('#rowInput'+props.word)
      if(inputRow.value.toLowerCase() === props.word){
        inputRow.style.color = 'green'
      }else{
        inputRow.style.color = 'red'
      }
      
      
    }
      
    return(
        <div>
            <input type='text' className="rowInput" id={`rowInput${props.word}`} onChange={colorChange}></input>
        </div>
    )
}