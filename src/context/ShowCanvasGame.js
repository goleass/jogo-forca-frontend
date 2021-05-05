import React, { createContext, useState, useContext } from "react";

const ShowCanvasGameContext = createContext();

export default function ShowCanvasGameProvider({ children }) {
  const [showCanvasGame, setShowCanvasGame] = useState(false);

  return (
    <ShowCanvasGameContext.Provider
      value={{
        showCanvasGame,
        setShowCanvasGame
      }}
    >
      {children}
    </ShowCanvasGameContext.Provider>
  );
}

export function useShowCanvasGame() {
  const context = useContext(ShowCanvasGameContext);
  if (!context) throw new Error("useCount must be used within a CountProvider");
  const { showCanvasGame, setShowCanvasGame } = context;
  return { showCanvasGame, setShowCanvasGame };
}