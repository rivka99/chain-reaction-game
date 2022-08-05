import React from "react";

export default function Loader() {
  return (
    <img
      src={require("./loadinggif.gif")}
      alt="loading"
      className="loader-gif"
    />
  );
}
