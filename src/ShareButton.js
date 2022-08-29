import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function ShareButton(props) {
  return (
    <div id="copy-div">
      <CopyToClipboard text={props.text} onCopy={() => {}}>
        <button>Copy your score to share</button>
      </CopyToClipboard>
    </div>
  );
}
