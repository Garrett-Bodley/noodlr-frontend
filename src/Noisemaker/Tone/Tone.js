import React, { useState } from "react";
import styled from "styled-components";
import { border, color, layout, space } from "styled-system";
import AspectRatioContainer from "../../utilities/AspectRatio/AspectRatioContainer";
import "./tone.css";

const Button = styled.button`
  ${border};
  ${color};
  ${layout};
  ${space};
  box-shadow: -1px 3px 4px 1px #B5B1BF;

  &:checked {
    box-shadow: inset -1px 3px 4px 1px #B5B1BF;
  }
`;

const Checkbox = styled.input`
  visibility: hidden;
`

const Tone = (props) => {

  const [isPressed, setIsPressed] = useState(false)

  const handleOnClick = () => {
    setIsPressed(prevState => !prevState)
  }

  return (
    <AspectRatioContainer {...props}>
      <Button
        onClick={handleOnClick}
        width="100%"
        height="100%"
        border="1px solid black"
        bg={isPressed ? 'coral' : "lightgray"}
        borderRadius="8px"
      />
    </AspectRatioContainer>
  );
};

export default Tone;
