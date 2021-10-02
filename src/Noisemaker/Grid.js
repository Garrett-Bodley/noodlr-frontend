import React from "react";
import styled from "styled-components";
import { grid, layout } from "styled-system";

import Row from './Row/Row'
import { SynthProvider } from "../utilities/SynthContext";

const Article = styled.article`
  ${grid};
  ${layout}
`;

const Grid = ({ rowCount, beatCount, colors }) => {
  const renderRows = (rowCount, beatCount) => {
    return [...Array(rowCount)].map((_, index) => (
      <Row key={ index } beatCount={beatCount} rowNum={index} color={index < 6 ? colors.primary : colors.secondary} />
    ));
  };

  return (
    <SynthProvider>
      <Article
        width="100%"
        height="100%"
        display="grid"
        gridTemplateRows={`repeat(${rowCount}, 1fr)`}
        gridGap="4px"
      >
        {renderRows(rowCount, beatCount)}
      </Article>
    </SynthProvider>
  );
};

export default Grid;
