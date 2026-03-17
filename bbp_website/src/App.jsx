import React from "react";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import Articles from "./pages/Articles";
import Destinations from "./pages/Destinations";
import Home from "./pages/Home";
import News from "./pages/News";
import Visas from "./pages/Visas";
import VisaTypePage from "./pages/VisaTypePage";

function ArticlesRoute() {
  const navigate = useNavigate();
  return <Articles onBack={() => navigate("/")} />;
}

function NewsRoute() {
  const navigate = useNavigate();
  return <News onBack={() => navigate("/")} />;
}

function VisaTypeRoute() {
  const navigate = useNavigate();
  const { visaType } = useParams();
  const visaName = visaType ? decodeURIComponent(visaType) : null;

  if (!visaName) return <Navigate to="/visas" replace />;
  return <VisaTypePage visaName={visaName} onBack={() => navigate(-1)} />;
}

function DestinationRoute() {
  const navigate = useNavigate();
  const { region } = useParams();
  const destinationName = region ? decodeURIComponent(region) : null;

  if (!destinationName) return <Navigate to="/" replace />;
  return <Destinations destinationName={destinationName} onBack={() => navigate(-1)} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/visas" element={<Visas />} />
      <Route path="/visas/:visaType" element={<VisaTypeRoute />} />
      <Route path="/destinations/:region" element={<DestinationRoute />} />
      <Route path="/articles" element={<ArticlesRoute />} />
      <Route path="/news" element={<NewsRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
