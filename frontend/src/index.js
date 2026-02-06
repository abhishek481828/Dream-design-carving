import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";
import GlobalErrorHandler from "./components/GlobalErrorHandler";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <GlobalErrorHandler>
        <App />
    </GlobalErrorHandler>
);
