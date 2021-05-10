import React, { createContext, useState, useContext } from "react";

const ShowCanvasGameContext = createContext();

export default function ShowCanvasGameProvider({ children }) {
  const [showCanvasGame, setShowCanvasGame] = useState(false);
  const [category, setCategory] = useState(null);
  const [dificult, setDificult] = useState(null);

  return (
    <ShowCanvasGameContext.Provider
      value={{
        showCanvasGame,
        setShowCanvasGame,
        category,
        setCategory,
        dificult,
        setDificult
      }}
    >
      {children}
    </ShowCanvasGameContext.Provider>
  );
}

export function useShowCanvasGame() {
  const context = useContext(ShowCanvasGameContext);
  if (!context) throw new Error("useCount must be used within a CountProvider");
  const {
    showCanvasGame,
    setShowCanvasGame,
    category, 
    setCategory,
    dificult,
    setDificult
  } = context;
  return {
    showCanvasGame,
    setShowCanvasGame,
    category,
    setCategory,
    dificult,
    setDificult
  };
}