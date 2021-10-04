import React, { useContext, useEffect, useRef, useState } from 'react';
import * as Tone from "tone";
import makeSynths from './makeSynths';
import { useVamp } from '../VampUtilities/VampProvider'
import makeGrid from '../makeGrid';

const SynthContext = React.createContext()

const toneConfig = (repeat, tempo,) => {
  Tone.Transport.bpm.value = tempo
  Tone.Transport.scheduleRepeat(repeat, "8n")
}

export const SynthProvider = ({children}) => {

  const [beat, setBeat] = useState(0)
  const synths = useRef(makeSynths())
  const [tempo, setTempo] = useState(120)
  const vamp = useVamp()

  useEffect(() => {
    toneConfig(repeat, tempo)
  })

  const repeat = (time) => {
    vamp.forEach((row, index) => {
      let tone = row[beat]
      if(tone.isActive){
        synths.current[index].triggerAttackRelease(tone.pitch, "8n", time)
      }
    })
    setBeat(beat + 1)
  }

  return (
    <SynthContext.Provider value={synths.current}>
      {children}
    </SynthContext.Provider>
  )
}