import React from "react";
import styled from "styled-components";
import Tone from "./Tone/Tone";
import { grid, layout } from "styled-system";

import Row from './Row/Row'

const Article = styled.article`
  ${grid};
  ${layout}
`;

const Grid = ({ rowCount, beatCount, colors }) => {
  const renderRows = (rowCount, beatCount) => {
    return [...Array(rowCount)].map((_, index) => (
      <Row key={ index } beatCount={beatCount} color={index < 6 ? colors.primary : colors.secondary} />
    ));
  };

  return (
    <Article
      width="100%"
      height="100%"
      display="grid"
      gridTemplateRows={`repeat(${rowCount}, 1fr)`}
      gridGap="2px"
    >
      {renderRows(rowCount, beatCount)}
    </Article>
  );
};

export default Grid;
