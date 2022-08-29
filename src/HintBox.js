import React from "react";
import { useEffect, useState } from "react";

export default function HintBox(props) {
  const [hintWords, setHintWords] = useState([]);
  useEffect(() => {
    fetch(`https://api.datamuse.com/words?sp=${props.hintWord}%20*`).then(
      (res) => {
        return res.json().then((words) => {
          setHintWords([]);
          for (let i = 0; i < words.length; i++) {
            let noSpaceWord = words[i].word.replace(/ /g, "");
            if (words[i].word.length - 1 === noSpaceWord.length) {
              setHintWords((hintWords) => [
                ...hintWords,
                `${words[i].word.replace(props.hintWord, "")} | `,
              ]);
            }
          }
        });
      }
    );
  }, [props.hintWord]);
  return (
    <div
      id="hint-cont"
      style={{ display: props.showInfo ? "block" : "none", marginBottom: "8%" }}
    >
      <h5>
        Below are some suggestions for words that may* include the correct
        answer:
      </h5>
      <div id="hint-div">{hintWords}</div>
      <small style={{ color: "red" }}>
        *There is no guarantee that the actual answer is listed here.
      </small>
    </div>
  );
}
