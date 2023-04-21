import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import localization from "./localization.json";
import "./main.css";

i18n.use(initReactI18next).init({
  resources: localization,
  lng: "de",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
