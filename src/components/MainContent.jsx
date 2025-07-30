import React, { useState } from "react";
import LogoScreen from "./LogoScreen";
import SettingsDrawer from "./SettingsDrawer";

const MainContent = ({ query, url, onSearch }) => {
  const [bgImage, setBgImage] = useState(""); 
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div
      className="relative w-full h-full"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <LogoScreen onSearch={onSearch} onShortcutClick={onSearch} />
      <SettingsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSetBackground={setBgImage}
      />
    </div>
  );
};

export default MainContent;
