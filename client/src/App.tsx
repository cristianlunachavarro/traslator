import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import { useUserStore } from "./store/user";

import Layout from "./components/layout";
import Translate from "./pages/translate";
import Register from "./pages/register";
import History from "./pages/history";
import Login from "./pages/login";

export default function App() {
  const hydrate = useUserStore((state) => state.hydrate);

  useUserStore((state) => state.isHydrated);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Translate />} />
          <Route path="/history" element={<History />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
