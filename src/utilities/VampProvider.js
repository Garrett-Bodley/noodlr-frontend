import React, { useContext, useRef } from "react";
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
  const vamp = useRef(makeGrid());

  const toggleNote = (clickedRow, clickedNote) => {
    let note = vamp.current[clickedRow][clickedNote]
    note.isActive = !note.isActive
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
