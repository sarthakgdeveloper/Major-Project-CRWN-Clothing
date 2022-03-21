import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persister } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "flag-icons/css/flag-icons.min.css";

import "./index.css";
import Loader from "./components/loader/loader";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "hi"],
    fallbackLng: "en",
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/assets/locale/{{lng}}/translation.json",
    },
  });

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persister}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </Suspense>,
  document.getElementById("root")
);
