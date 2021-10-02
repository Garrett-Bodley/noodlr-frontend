import React, { useContext, useRef } from 'react';
import makeSynths from './makeSynths';

const SynthContext = React.createContext()

export const SynthProvider = ({children}) => {

  const synths = useRef(makeSynths())

  return (
    <SynthContext.Provider value={synths}>
      {children}
    </SynthContext.Provider>
  )
}