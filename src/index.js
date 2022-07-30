import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Airtable from "airtable";
import axios from "axios";
import reportWebVitals from "./reportWebVitals";

//create a new Airtable object in React
new Airtable({ apiKey: "keyXtNN1IA8rc3AFL" }).base("appckBpYu9DrBYBQ0");
//base endpoint to call with each request
axios.defaults.baseURL =
  "https://api.airtable.com/v0/appckBpYu9DrBYBQ0/tabledata/";
//content type to send with all POST requests
axios.defaults.headers.post["Content-Type"] = "application/json";
//authenticate to the base with the API key
axios.defaults.headers["Authorization"] = "Bearer keyXtNN1IA8rc3AFL";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
