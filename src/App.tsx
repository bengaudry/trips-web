// React routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// App pages and layout
import { Layout } from "./components";
import { Add, Home, Settings, NoPage } from "./pages";

// Auth pages and layout
import { AuthLayout, Welcome, RegisterPage, SignInPage } from "./pages/auth";

// Styles
import "/src/assets/index.css";
import { onAuthStateChanged, User } from "firebase/auth";
import { getFirebaseAuth } from "../server";

// Translations
import { resources } from "../lang";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources,
  lng: "fr",
  interpolation: {
    escapeValue: false,
  },
});

export default function App() {
  const [currentUser, setCurrentUser] = useState<null | User>(null);

  onAuthStateChanged(getFirebaseAuth(), (user) => {
    setCurrentUser(user);
  });

  return currentUser ? (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home user={currentUser} />} />
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
          <Route index element={<Welcome />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<Welcome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
