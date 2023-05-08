// React routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// App pages and layout
import { Layout } from "./components";
import { Add, Home, Settings, NoPage } from "./pages";

// Auth pages and layout
import {
  AuthLayout,
  Landing,
  RegisterPage,
  SignInPage,
  ResetPassword,
} from "./pages/auth";

// Styles
import "/src/assets/index.css";
import { onAuthStateChanged, User } from "firebase/auth";
import { getFirebaseAuth } from "../server";

// Translations
import { resources } from "../lang";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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

  // Show the app if connected, if not, show the login page
  useEffect(() => {
    // Set loader visible if a previous connexion is detected
    const previouslyConnected = localStorage.getItem("connected");
    if (previouslyConnected && previouslyConnected === "true") {
      setLoaderVisible(true);
    }
  }, [userLoggedIn]);

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
      {loaderVisible ? (
        <div className="fixed inset-0 w-screen h-screen bg-neutral-200 dark:bg-black z-[70] grid place-content-center">
          Loading app...
        </div>
      ) : (
        <></>
      )}
      {userLoggedIn ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="add" element={<Add />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Landing />} />
              <Route path="signin" element={<SignInPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="reset" element={<ResetPassword />} />
              <Route path="*" element={<Landing />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}
