import React, { useState, useRef } from "react";
import makeSynths from "../utilities/makeSynths";
import makeGrid from "../utilities/makeGrid";
import gridColors from "../utilities/gridColors";


const Noisemaker = () => {

  const [synths, setSynths] = useRef(makeSynths())
  const [beat, setBeat] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120)
  const [volume, setVolume] = useState(parseFloat(-20))
  const [grid, setGrid] = useState(makeGrid())

  const renderGrid = () => {
    
  }

  return (
    <div id="noisemaker">
      <section id="grid">

      </section>
    </div>
  );
};

export default Noisemaker;
