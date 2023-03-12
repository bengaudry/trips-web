import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Add } from "./pages/Add";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Trips } from "./pages/Trips";
import { NoPage } from "./pages/NoPage";
import "/src/assets/index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home name="Ben" />} />
          <Route path="trips" element={<Trips />} />
          <Route path="add" element={<Add />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
