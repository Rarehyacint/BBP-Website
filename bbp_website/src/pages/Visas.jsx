import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Visas() {
  const navigate = useNavigate();

  // the interactive flags to be moved to Home
  // and the header drop down only to work for Visas, this route acts
  // as a basic fallback redirect to home just in case they land here directly.
  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
}
