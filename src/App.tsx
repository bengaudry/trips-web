// React routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// App pages and layout
import { Layout, Loader } from "./components";
import {
  Add,
  Home,
  Settings,
  Certificate,
  ShowCertificate,
  NoPage,
} from "./pages";

// Auth pages and layout
import { AuthLayout, Landing, Auth } from "./pages/auth";
import { Install as InstallPage } from "./pages";

// Styles
import "./styles/index.css";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from "../server";

// Translations
import { resources } from "../lang";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <>
      {loaderVisible && <Loader />}

      {offline && (
        <button
          className="fixed top-6 right-6 bg-red-500/50 backdrop-blur-lg px-6 py-2 rounded-full hover:scale-110 transition-transform duration-300"
          onClick={() => setOffline(false)}
        >
          <i className="inline-block fi fi-rr-down-left-and-up-right-to-center mr-2 translate-y-0.5"></i>
          <span>App is offline</span>
        </button>
      )}

      <ToastContainer newestOnTop limit={1} closeButton theme="light" />

      {userLoggedIn ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="add" element={<Add />} />
              <Route path="settings" element={<Settings />} />
              <Route path="certificate" element={<Certificate />} />
              <Route path="install" element={<InstallPage />} />
              <Route path="*" element={<NoPage />} />
              <Route path="show-certificate" element={<ShowCertificate />} />
            </Route>
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Landing />} />
              <Route path="auth" element={<Auth />} />
              <Route path="*" element={<Landing />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}
