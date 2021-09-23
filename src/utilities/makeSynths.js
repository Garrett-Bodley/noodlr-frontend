import * as Tone from "tone";

const makeSynths = () => {
  // Make pitched synths
  const synths = [];
  for (let i = 0; i < 6; i++) {
    let synth = new Tone.Synth({
      oscillator: { type: "square8" },
    }).toDestination();
    synths.push(synth);
  }

  // Make 3 Samplers for Drum sounds.
  for (let i = 0; i < 3; i++) {
    let drums = new Tone.Sampler({
      urls: {
        C3: "hihat.mp3",
        C2: "snare.mp3",
        C1: "kick.mp3",
      },
      baseUrl: "https://tonejs.github.io/audio/drum-samples/CR78/",
    }).toDestination();
    synths.push(drums);
  }

  return synths;
};

export default makeSynths