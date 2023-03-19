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
import { SignInPage } from "./pages/Auth/SignIn";
import { RegisterPage } from "./pages/Auth/Register";
import { Welcome } from "./pages/Auth/Welcome";
import { AuthLayout } from "./pages/Auth/Layout";

// Styles
import "/src/assets/index.css";
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
              <Profile
                setCurrentUser={setCurrentUser}
                user={currentUser}
              />
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
          <Route index element={<Welcome />} />
          <Route
            path="signin"
            element={
              <SignInPage />
            }
          />
          <Route
            path="register"
            element={
              <RegisterPage />
            }
          />
          <Route path="*" element={<Welcome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
