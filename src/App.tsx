// React routing
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// Styles
import "./styles/index.css";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from "../server";

// Translations
import { resources } from "../lang";
import i18n, { use } from "i18next";
import { initReactI18next } from "react-i18next";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routing } from "Routing";

// Change the language of the app when it starts
var lang = "fr";
const savedLang = localStorage.getItem("app-lang") as string;
// If a language is prefered by the user, do nothing
if (savedLang === undefined || savedLang === null || savedLang === "") {
  if (navigator.language.includes("fr")) {
    lang = "fr";
  } else {
    lang = "en";
  }
} else {
  // Sets the language to the saved one
  lang = savedLang;
}

console.log(`Switching lang to ${lang}`);
// Init translation with the language chosen
i18n.use(initReactI18next).init({
  resources,
  lng: lang,
  interpolation: {
    escapeValue: false,
  },
});

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [offline, setOffline] = useState(!navigator.onLine);

  // Show the app if connected, if not, show the login page
  useEffect(() => {
    // Set loader visible if a previous connexion is detected
    const previouslyConnected = localStorage.getItem("connected");
    if (previouslyConnected && previouslyConnected === "true") {
      setLoaderVisible(true);
    }
  }, [userLoggedIn]);

  addEventListener("offline", () => {
    setOffline(true);
  });

  addEventListener("online", () => {
    setOffline(false);
  });

  useEffect(() => {
    if (offline) {
      setTimeout(() => {
        setOffline(false);
      }, 3000);
    }
  }, [offline]);

  onAuthStateChanged(getFirebaseAuth(), (user) => {
    if (user) {
      setLoaderVisible(false);
      setUserLoggedIn(true);
    } else {
      setLoaderVisible(false);
      setUserLoggedIn(false);
    }
  });

  return (
    <BrowserRouter>
      <Routing
        userLoggedIn={userLoggedIn}
        offline={offline}
        loaderVisible={loaderVisible}
      />
    </BrowserRouter>
  );
}
