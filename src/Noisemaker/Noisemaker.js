import React, { useState, useRef } from "react";
import styled from 'styled-components';
import { color, grid, layout, space } from 'styled-system';

import Note from "./Note";
import makeSynths from "../utilities/makeSynths";
import makeGrid from "../utilities/makeGrid";
import gridColors from "../utilities/gridColors";
import classNames from "classnames/bind";
import AspectRatioContainer from "../utilities/AspectRatio/AspectRatioContainer";

import "./Noisemaker.css";

const Container = styled.section`
  ${grid};
  ${layout}
`
const Aspect = styled(AspectRatioContainer)`
  ${grid}
  ${space};
`

const ControlsWrapper = styled.section`
  ${grid};
  ${color};
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
    <Container display="grid" gridTemplateRows="1fr 1fr" gridTemplateAreas={' "tones" "controls" '}>
      <Aspect gridArea="tones" width={"90%"} mx="auto" ratio={9/16}>
      </Aspect>
      <ControlsWrapper gridArea="controls" bg="slategray">controls</ControlsWrapper>
    </Container>
  );
};

export default Noisemaker;



//  1. Make a grid component
//    a. Stub out grid layout within component
//    b. Create button component
//      1. Build 3d button component.
//      2. Set up color prop capability
//    c. Fill grid with buttons.
//    d. Map buttons & button state to synth
//    e. Figure out how to display which beat is active.
//  2. Stub out basic controls component.
//    a. Start/Stop button
//    b. Tempo Slider
//    c. Volume Slider
//    d. Save Button (****ONLY WHEN LOGGED IN****)
//    e. Share button
//  3. Figure out responsive design.