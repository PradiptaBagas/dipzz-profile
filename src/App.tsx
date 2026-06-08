import React from "react";
import Portfolio from "./components/Portfolio";

function App() {
  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden relative">
      {/* Cukup panggil satu komponen utama Portfolio yang sudah mengelola Dock dan Finder */}
      <Portfolio />
    </div>
  );
}

export default App;