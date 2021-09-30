import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: ${(props) => props.width || "100%"};

  &::before {
    float: left;
    padding-top: calc(
      ${(props) => props.width || "100%"} * ${(props) => props.ratio || "1"}
    );
    content: ""; 
  }

  &::after {
    display: block;
    content: "";
    clear: both;
  }
`;

const AspectRatioContainer = (props) => {
  return (
    <Wrapper {...props} ratio={props.ratio} width={props.width}>
      {props.children}
    </Wrapper>
  );
};

export default AspectRatioContainer;
