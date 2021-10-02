import React, { useContext, useRef, useState } from 'react';
import * as Tone from "tone";
import makeSynths from './makeSynths';

const SynthContext = React.createContext()

const toneLoop = (time) => {
  const [beat, setBeat] = useState(0)

}

export const SynthProvider = ({children}) => {

  const synths = useRef(makeSynths())

  return (
    <SynthContext.Provider value={synths.current}>
      {children}
    </SynthContext.Provider>
  )
}