import React from "react";
import styled from "styled-components";
import { border, color, layout, grid } from "styled-system";

import Tone from "../Tone/Tone";

const StyledRow = styled.div`
  ${layout};
  ${grid}
`;

const Box = styled.div`
  ${border};
  ${color};
  ${layout};
`;

const Row = ({ beatCount, color }) => {
  const displayTones = (beatCount, color) => {
    return [...Array(beatCount)].map((_, index) => {
      return <Tone key={index} color={color} />
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
