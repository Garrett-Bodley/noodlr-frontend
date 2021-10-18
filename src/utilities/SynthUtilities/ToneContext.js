import React, { useContext, useCallback, useRef, useState } from "react";
import * as Tone from "tone";
import useSynths from "../useSynths"
import { useVamp } from "../VampUtilities/VampProvider";

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
  const beat = useRef(0);
  const synths = useSynths()
  const [tempo, setTempo] = useState(120);
  const [volume, setVolume] = useState(parseFloat(-20));
  const vamp = useVamp();

  const togglePlay = () => {
    if (!isActivated) {
      Tone.start();
      Tone.Transport.bpm.value = tempo;
      Tone.Transport.scheduleRepeat(repeat, "8n");
      Tone.getDestination().volume.rampTo(volume, 0.001);
      setIsActivated(true);
    }
    isPlaying ? Tone.Transport.stop() : Tone.Transport.start()
    setIsPlaying(prevState => !prevState);
  };

  const repeat = useCallback(
    (time) => {
      vamp.current.forEach((row, index) => {
        let tone = row[beat.current];
        if (tone.isActive) {
          synths[index].triggerAttackRelease(tone.pitch, "8n", time);
        }
      });
      beat.current = (beat.current + 1) % 16;
    },
    [synths, vamp]
  );

  return (
    <ToneContext.Provider value={Tone}>
      <ToneUpdateContext.Provider value={togglePlay}>
        {children}
      </ToneUpdateContext.Provider>
    </ToneContext.Provider>
  );
};

export default ToneProvider;
