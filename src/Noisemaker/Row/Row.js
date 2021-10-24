import React from "react";
import styled from "styled-components";
import { layout, space, grid } from "styled-system";
import Tone from "../Tone/Tone";

const StyledRow = styled.div`
  ${layout};
  ${space}
  ${grid}
`;

const Row = ({ beatCount, color, rowNum }) => {
  const displayTones = (beatCount, color) => {
    return [...Array(beatCount)].map((_, index) => {
      return <Tone key={index} rowNum={rowNum} beatNum={index} color={color} />;
    });
  };

  return (
    <StyledRow
      display="grid"
      height="100%"
      width="100%"
      gridTemplateColumns={`repeat(${beatCount}, 1fr)`}
      gridGap="2px"
    >
      {displayTones(beatCount, color)}
    </StyledRow>
  );
};

export default Row;
