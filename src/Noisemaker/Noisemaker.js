import React, { useState, useRef } from "react";
import styled from 'styled-components';
import { color, grid, layout, space } from 'styled-system';

import Note from "./Note";
import makeSynths from "../utilities/SynthUtilities/makeSynths";
import makeGrid from "../utilities/makeGrid";
import gridColors from "../utilities/gridColors";
import classNames from "classnames/bind";

import AspectRatioContainer from "../utilities/AspectRatio/AspectRatioContainer";
import Grid from './Grid'
import VampProvider from "../utilities/VampUtilities/VampProvider";

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
    <VampProvider>
      <Container display="grid" gridTemplateRows="1fr 1fr" gridTemplateAreas={' "tones" "controls" '}>
        <Aspect gridArea="tones" width="90%" mx="auto" my="1em" ratio={9/16}>
          <Grid rowCount={9} beatCount={16} colors={{primary: '#38CC77', secondary: '#DE4839'}}></Grid>
        </Aspect>
        <ControlsWrapper gridArea="controls" bg="slategray"><button>Toggle Play/Pause</button></ControlsWrapper>
      </Container>
    </VampProvider>
  );
};

export default Noisemaker;



//  1. Make a grid component
//    a̶.̶ S̶t̶u̶b̶ o̶u̶t̶ g̶r̶i̶d̶ l̶a̶y̶o̶u̶t̶ w̶i̶t̶h̶i̶n̶ c̶o̶m̶p̶o̶n̶e̶n̶t̶
//    b̶.̶ C̶r̶e̶a̶t̶e̶ b̶u̶t̶t̶o̶n̶ c̶o̶m̶p̶o̶n̶e̶n̶t̶
//      1̶.̶ S̶e̶t̶ u̶p̶ c̶o̶l̶o̶r̶ p̶r̶o̶p̶ c̶a̶p̶a̶b̶i̶l̶i̶t̶y̶
//    c̶.̶ F̶i̶l̶l̶ g̶r̶i̶d̶ w̶i̶t̶h̶ b̶u̶t̶t̶o̶n̶s̶.̶
//    d. Map buttons & button state to synth
//      1. Create grid context (maybe synth context?)
//      2. Toggle notes using context
//    e. Figure out how to display which beat is active.
//  2. Stub out basic controls component.
//    a. Start/Stop button
//    b. Tempo Slider
//    c. Volume Slider
//    d. Save Button (****ONLY WHEN LOGGED IN****)
//    e. Share button
//  3. Figure out responsive design.
//  4. Fix landscape view for mobile
//  5. Refactor so Noisemaker can accept alternate notes/number of beats