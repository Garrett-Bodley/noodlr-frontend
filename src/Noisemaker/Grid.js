import React from "react";
import styled from "styled-components";
import { grid, layout } from "styled-system";

const Article = styled.article`
  ${grid};
  ${layout}
`;

const Grid = ({ rowCount, beatCount }) => {
  

  return <Article display={"grid"} gridTemplateRows={`repeat(${rowCount}, 1fr)`} gridTemplateColumns={`repeat(${beatCount}, 1fr)`}></Article>;
};

export default Grid;
