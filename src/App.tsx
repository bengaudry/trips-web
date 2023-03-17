// React routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// App pages and layout
import { Layout } from "./components/Layout";
import { Add } from "./pages/Add";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { NoPage } from "./pages/NoPage";

// Auth pages and layout
import { LoginPage } from "./pages/Auth/Login";
import { AuthLayout } from "./pages/Auth/Layout";

// Styles
import "/src/assets/index.css";
import { RegisterPage } from "./pages/Auth/Register";
import { onAuthStateChanged, User } from "firebase/auth";
import { getFirebaseAuth } from "../server";

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
          <Route
            path="profile"
            element={
              <Profile setCurrentUser={(user: null | User) => setCurrentUser} />
            }
          />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route
            index
            element={
              <LoginPage
                setCurrentUser={(user: User) => setCurrentUser(user)}
              />
            }
          />
          <Route
            path="register"
            element={
              <RegisterPage
                setCurrentUser={(user: User) => setCurrentUser(user)}
              />
            }
          />
          <Route
            path="*"
            element={
              <LoginPage
                setCurrentUser={(user: User) => setCurrentUser(user)}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
