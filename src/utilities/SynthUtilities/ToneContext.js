import React, { useContext, useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import makeSynths from "./makeSynths";
import { useVamp } from "../VampUtilities/VampProvider";
import makeGrid from "../makeGrid";

const ToneContext = React.createContext();
const ToneUpdateContext = React.createContext();

export const useTone = () => {
  return useContext(ToneContext);
};

export const useToneUpdate = () => {
  return useContext(ToneUpdateContext);
};

const ToneProvider = ({ children }) => {
  const [isActivated, setIsActivated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beat, setBeat] = useState(0);
  const [synths, setSynths] = useState([...makeSynths(Tone)]);
  const toneRef = useRef(Tone).current
  const [tempo, setTempo] = useState(120);
  const vamp = useVamp();

  const toneConfig = (repeat, tempo) => {
    Tone.Transport.bpm.value = tempo;
    Tone.Transport.scheduleRepeat(repeat, "8n");
  };

  const togglePlay = () => {
    console.log(synths)
    if (!isActivated) {
      Tone.start().then(() => {
        setIsActivated(true);
        toneConfig(repeat, tempo)
      })
    }
    if (isPlaying) {
      Tone.Transport.stop();
    } else {
      Tone.Transport.start();
    }

    setIsPlaying((prevState) => !prevState);
  };

  const repeat = (time) => {
    vamp.forEach((row, index) => {
      let tone = row[beat];
      if (tone.isActive) {
        synths[index].triggerAttackRelease(tone.pitch, "8n", time);
      }
      setBeat(prevState => ((prevState + 1) % 16));
    });
  };

  return (
    <ToneContext.Provider value={Tone}>
      <ToneUpdateContext.Provider value={togglePlay}>
        {children}
      </ToneUpdateContext.Provider>
    </ToneContext.Provider>
  );
};

export default ToneProvider;
