// React routing
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

// Styles
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from "../server";
import "./styles/index.css";

// Translations
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "../lang";

import { NotStandaloneAlert } from "@/components";
import { useModal } from "@/hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routing } from "./Routing";

// Change the language of the app when it starts
var lang = "fr";
const savedLang = localStorage.getItem("app-lang") as string;
// If a language is prefered by the user, do nothing
if (!savedLang || savedLang === "") {
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
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false,
  },
});

export default function App() {
  const { modalContent } = useModal();

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

  const [runningInBrowser, setRunningInBrowser] = useState(false);

  // Check if the web app is running in standalone mode on iOS devices
  const isInStandaloneMode = () =>
    window.matchMedia("(display-mode: standalone)").matches;

  useEffect(() => {
    setRunningInBrowser(!isInStandaloneMode());
  }, []);

  return (
    <BrowserRouter>
      {/* <NotStandaloneAlert
        shown={
          runningInBrowser && document.location.href !== "http://localhost:5173"
        }
        setShown={setRunningInBrowser}
      /> */}
      <ToastContainer newestOnTop limit={1} closeButton theme="dark" />
      <Routing
        userLoggedIn={userLoggedIn}
        offline={offline}
        loaderVisible={loaderVisible}
      />
      {modalContent}
    </BrowserRouter>
  );
}
