import {
  Home,
  Add,
  Settings,
  Certificate,
  ShowCertificate,
  Premium,
  NoPage,
  Install as InstallPage,
} from "pages";

import { AuthLayout, Landing, Auth } from "pages/auth";
import { Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components";
import { AnimatePresence } from "framer-motion";

export function Routing({
  userLoggedIn,
  offline,
  loaderVisible,
}: {
  userLoggedIn: boolean;
  offline: boolean;
  loaderVisible: boolean;
}) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={true}>
      <Routes location={location} key={location.pathname}>
        {userLoggedIn ? (
          <Route
            path="/"
            element={<Layout loaderVisible={loaderVisible} offline={offline} />}
          >
            <Route index element={<Home />} />
            <Route path="add" element={<Add />} />
            <Route path="settings" element={<Settings />} />
            <Route path="certificate" element={<Certificate />} />
            <Route path="install" element={<InstallPage />} />
            <Route path="show-certificate" element={<ShowCertificate />} />
            <Route path="premium" element={<Premium />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        ) : (
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Landing />} />
            <Route path="auth" element={<Auth />} />
            <Route path="*" element={<Landing />} />
          </Route>
        )}
      </Routes>
    </AnimatePresence>
  );
}
