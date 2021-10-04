import React, { useState } from "react";
import styled from "styled-components";
import { border, color, layout, position, space } from "styled-system";
import AspectRatioContainer from "../../utilities/AspectRatio/AspectRatioContainer";
import { useVampUpdate } from "../../utilities/VampUtilities/VampProvider";

const Button = styled.button`
  ${border};
  ${color};
  ${layout};
  ${position};
  ${space};

  &::before {
    content: "";
    background: transparent;
    position: absolute;
    inset: 0;
    border: none;
    border-radius: 4px;
    background-color: ${(props) => props.activeColor || "#38CC77"};
    box-shadow: inset -1px 1px 3px 0px #5e5e5e;
    opacity: ${(props) => (props.isPressed ? "100%" : "0%")};
    will-change: opacity;
    transition: opacity 100ms ease;
  }

  &::after {
    content: "";
    background: transparent;
    position: absolute;
    inset: 0;
    border: none;
    border-radius: 4px;
    background-color: lightgray;
    box-shadow: -1px 2px 3px 0px #5e5e5e;
    opacity: ${(props) => (props.isPressed ? "0%" : "100%")};
    ${"" /* opacity: 0%; */}
    will-change: opacity;
    transition: opacity 100ms ease-in;
  }
`;

const Tone = (props) => {
  const [isPressed, setIsPressed] = useState(false);
  const toggleNote = useVampUpdate();

  const handleOnClick = () => {
    setIsPressed((prevState) => !prevState);
    toggleNote(props.rowNum, props.beatNum);
  };

  return (
    <AspectRatioContainer {...props}>
      <Button
        onClick={handleOnClick}
        position="relative"
        isPressed={isPressed}
        width="100%"
        height="100%"
        border="1px solid black"
        bg="lightgray"
        activeColor={props.color}
        borderRadius="4px"
      />
    </AspectRatioContainer>
  );
};

export default Tone;
