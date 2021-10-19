import React from "react";
import styled from 'styled-components';
import "./Noisemaker.css";
import { grid, layout, space } from 'styled-system';
import Grid from './Grid'
import Controls from './Controls/Controls'
import VampProvider from "../utilities/VampProvider";

import ToneProvider from "../utilities/ToneContext";

const Container = styled.section`
  ${grid};
  ${layout}
  ${space}
`

const StyledGrid = styled(Grid)`
  ${grid}
  ${space}
`

const Noisemaker = (props) => {

  return (
    <VampProvider>
      <ToneProvider>
        <Container {...props} margin="auto" display="grid" gridTemplateColumns="4fr 1fr" gridTemplateAreas={' "tones controls" '}>
            <StyledGrid gridArea="tones" rowCount={9} beatCount={16} p="2em" colors={{primary: '#38CC77', secondary: '#DE4839'}} />
          <Controls gridArea="controls" bg="slategray" />
        </Container>
      </ToneProvider>
    </VampProvider>
  );
};

export default Noisemaker;



//  1. Make a grid component
//    a̶.̶ S̶t̶u̶b̶ o̶u̶t̶ g̶r̶i̶d̶ l̶a̶y̶o̶u̶t̶ w̶i̶t̶h̶i̶n̶ c̶o̶m̶p̶o̶n̶e̶n̶t̶
//    b̶.̶ C̶r̶e̶a̶t̶e̶ b̶u̶t̶t̶o̶n̶ c̶o̶m̶p̶o̶n̶e̶n̶t̶
//      1̶.̶ S̶e̶t̶ u̶p̶ c̶o̶l̶o̶r̶ p̶r̶o̶p̶ c̶a̶p̶a̶b̶i̶l̶i̶t̶y̶
//    c̶.̶ F̶i̶l̶l̶ g̶r̶i̶d̶ w̶i̶t̶h̶ b̶u̶t̶t̶o̶n̶s̶.̶
//    d̶.̶ M̶a̶p̶ b̶u̶t̶t̶o̶n̶s̶ &̶ b̶u̶t̶t̶o̶n̶ s̶t̶a̶t̶e̶ t̶o̶ v̶a̶m̶p̶ n̶o̶t̶a̶t̶i̶o̶n̶
//      1̶.̶ C̶r̶e̶a̶t̶e̶ v̶a̶m̶p̶ c̶o̶n̶t̶e̶x̶t̶
//      2̶.̶ T̶o̶g̶g̶l̶e̶ n̶o̶t̶e̶s̶ u̶s̶i̶n̶g̶ c̶o̶n̶t̶e̶x̶t̶
//    e. Figure out how to display which beat is active.
//  2. Stub out basic controls component.
//    a. Start/Stop button
//    b. Tempo Slider
//    c. Volume Slider
//    d. Save Button (****ONLY WHEN LOGGED IN****)
//    e. Share button
//  3. Figure out responsive design.
//  4. Fix landscape view for mobile

// STRETCH
//  5. Refactor so Noisemaker can accept alternate notes/number of beats
//  6. Focus states for tones.
