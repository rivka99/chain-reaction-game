import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { RWebShare } from "react-web-share";

export default function ShareButton(props) {
  return (
    <div id="copy-div">
      <RWebShare
        data={{
          text: props.text,
          url: "",
          title: "",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <button>Share 🔗</button>
      </RWebShare>
    </div>
  );
}
