import { useState, useEffect } from "react";
import * as Tone from "tone";

const useSynths = () => {
  const [synths, setSynths] = useState(null);

  const makeSynths = () => {
    const synths = [];
    for (let i = 0; i < 6; i++) {
      let synth = new Tone.Synth({
        oscillator: { type: "square8" }
      }).toDestination();
      synths.push(synth);
    }

    for (let i = 0; i < 3; i++) {
      let drums = new Tone.Sampler({
        urls: {
          C3: "hihat.mp3",
          C2: "snare.mp3",
          C1: "kick.mp3"
        },
        baseUrl: "https://tonejs.github.io/audio/drum-samples/CR78/"
      }).toDestination();
      synths.push(drums);
    }

    return synths;
  };

  useEffect(() => {
    const createdSynths = makeSynths();
    setSynths(createdSynths);
    return () => createdSynths.forEach((synth) => synth.dispose());
  }, []);

  return synths;
};

export default useSynths;
