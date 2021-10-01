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

const Row = ({ beatCount }) => {
  const displayTones = (beatCount) => {
    return [...Array(beatCount)].map((_, index) => (
      <Tone key={index} />
    ));
  };

  return (
    <StyledRow
      display="grid"
      height="100%"
      width="100%"
      gridTemplateColumns={`repeat(${beatCount}, 1fr)`}
      gridGap="2px"
    >
      {displayTones(beatCount)}
    </StyledRow>
  );
};

export default Row;
