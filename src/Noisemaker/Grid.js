import React from "react";
import styled from "styled-components";
import { grid, layout } from "styled-system";
import LightRow from "./LightRow"
import Row from './Row/Row'

const Article = styled.article`
  ${grid};
  ${layout}
`;

const Grid = (props) => {

  const {rowCount, beatCount, colors} = props;

  const renderRows = (rowCount, beatCount) => {
    return [...Array(rowCount)].map((_, index) => (
      <Row key={ index } beatCount={beatCount} rowNum={index} color={index < 6 ? colors.primary : colors.secondary} />
    ));
  };

  return (
    <Article
      {...props}
      width="100%"
      height="100%"
      display="grid"
      gridTemplateRows={`repeat(${rowCount + 1}, 1fr)`}
      gridGap="2px"
    >
      <LightRow beatCount={beatCount} />
      {renderRows(rowCount, beatCount)}
    </Article>
  );
};

export default Grid;
