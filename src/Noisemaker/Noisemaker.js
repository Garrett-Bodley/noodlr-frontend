import React, { useState, useRef } from "react";
import styled from 'styled-components';
import { grid, layout, space } from 'styled-system';

import Note from "./Note";
import makeSynths from "../utilities/makeSynths";
import makeGrid from "../utilities/makeGrid";
import gridColors from "../utilities/gridColors";
import classNames from "classnames/bind";
import AspectRatioContainer from "../utilities/AspectRatio/AspectRatioContainer";

import "./Noisemaker.css";

const Container = styled.section`
  ${'' /* display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "tones"
    "controls"; */}
  ${grid};
  ${layout}
`
const Aspect = styled(AspectRatioContainer)`
  grid-area: tones;
  ${space};
`

const Noisemaker = () => {
  const synths = useRef(makeSynths());
  const [beat, setBeat] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [volume, setVolume] = useState(parseFloat(-20));
  const [grid, setGrid] = useState(makeGrid());

  const handleOnClick = (rowIndex, noteIndex) => {
    const newGrid = [...grid]
    newGrid[rowIndex][noteIndex].isActive = !newGrid[rowIndex][noteIndex].isActive
    setGrid(newGrid)
  };

  // const renderGrid = () => {
  //   return grid.map((row, rowIndex) => {
  //     return (
  //       <div key={rowIndex} className="note-row">
  //         {row.map(({ note, isActive }, noteIndex) => {
  //           return (
  //             <Note
  //               color={gridColors[rowIndex]}
  //               className={classNames(
  //                 "note",
  //                 { "on-beat": beat === (noteIndex + 1) % 16 },
  //                 { "note-is-active": isActive }
  //               )}
  //               key={noteIndex + note}
  //               isActive={isActive}
  //               note={note}
  //               onClick={() => handleOnClick(rowIndex, noteIndex)}
  //             />
  //           );
  //         })}
  //       </div>
  //     );
  //   });
  // };

  return (
    <Container display="grid" gridTemplateRows="1fr 1fr" gridTemplateAreas={'"tones" "controls"'}>
      <Aspect width={"90%"} mx="auto" ratio={9/16}>
      </Aspect>
      <div style={{"grid-area": "controls", "background-color": "slategray"}}>controls</div>
    </Container>
  );
};

export default Noisemaker;
