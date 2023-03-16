// React routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

// App pages and layout
import { Layout } from "./components/Layout";
import { Add } from "./pages/Add";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Trips } from "./pages/Trips";
import { NoPage } from "./pages/NoPage";

// Auth pages and layout
import { LoginPage } from "./pages/Auth/Login";
import { AuthLayout } from "./pages/Auth/Layout";

// Styles
import "/src/assets/index.css";
import { RegisterPage } from "./pages/Auth/Register";
import { useState } from "react";
import { UserCredential } from "firebase/auth";

export default function App() {
  const [currentUser, setCurrentUser] = useState<null | UserCredential>(null);

  return currentUser ? (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home user={currentUser} />} />
          <Route path="trips" element={<Trips />} />
          <Route path="add" element={<Add />} />
          <Route path="profile" element={<Profile />} />
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
                setCurrentUser={(user: UserCredential) => setCurrentUser(user)}
              />
            }
          />
          <Route
            path="register"
            element={
              <RegisterPage
                setCurrentUser={(user: UserCredential) => setCurrentUser(user)}
              />
            }
          />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
