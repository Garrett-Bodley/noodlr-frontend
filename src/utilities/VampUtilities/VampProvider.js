import React, { useContext, useState } from "react";
import makeGrid from "../makeGrid";

const VampContext = React.createContext();
const VampUpdateContext = React.createContext();

export const useVamp = () => {
  return useContext(VampContext);
};

export const useVampUpdate = () => {
  return useContext(VampUpdateContext);
};

const VampProvider = ({ children }) => {
  const [vamp, setVamp] = useState(makeGrid());

  const toggleNote = (clickedRow, clickedNote) => {
    const newGrid = vamp.map((row, rowIndex) => {
      return row.map((note, noteIndex) => {
        if (clickedRow === rowIndex && clickedNote === noteIndex) {
          return { ...note, isActive: !note.isActive };
        } else {
          return { ...note };
        }
      });
    });

    setVamp(newGrid);
  };

  return (
    <VampContext.Provider value={vamp}>
      <VampUpdateContext.Provider value={toggleNote}>
        {children}
      </VampUpdateContext.Provider>
    </VampContext.Provider>
  );
};

export default VampProvider;
