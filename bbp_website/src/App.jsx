import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Visas from "./pages/Visas";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/visas" element={<Visas />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}