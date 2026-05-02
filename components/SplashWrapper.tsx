"use client";

import { useState, useEffect } from "react";
import { SplashScreen } from "./SplashScreen";

export function SplashWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("razzaq-splash-seen");
    if (!seen) setShowSplash(true);
  }, []);

  function handleEnter() {
    sessionStorage.setItem("razzaq-splash-seen", "1");
    setShowSplash(false);
  }

  return (
    <>
      {showSplash && <SplashScreen onEnter={handleEnter} />}
      <div
        style={{
          opacity: showSplash ? 0 : 1,
          transition: "opacity 700ms ease",
          pointerEvents: showSplash ? "none" : "auto",
        }}
      >
        {children}
      </div>
    </>
  );
}
