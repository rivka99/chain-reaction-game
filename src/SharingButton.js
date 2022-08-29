import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ShareButton from "react-web-share-button";

export default function SharingButton(props) {
  return (
    <div id="copy-div">
      <ShareButton
        title="My Great Page"
        text="A really great page"
        url="http://www.greatpage.com"
      />
    </div>
  );
}
