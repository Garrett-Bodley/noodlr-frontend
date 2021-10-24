import React, { useCallback, useState } from "react";
import "./playpausebutton.css";
import PlayPauseIcon from "./PlayPauseIcon";
import { usePlayPause } from "../../utilities/ToneProvider";
import { animated, config, useSpring } from "react-spring";
import styled from "styled-components";
import { color, space, layout } from "styled-system";

const StyledPlayPause = styled(PlayPauseIcon)`
  ${color};
  ${layout};
  ${space};
`;

const PlayPauseButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const togglePlay = usePlayPause();

  const pressButton = (e) => {
    e.preventDefault();
    togglePlay()
    setIsPressed(!isPressed);
  };

  const parseConfig = useCallback(() => {
    if (isActive) return config.stiff;
    if (isPressed || isHovered) return config.wobbly;
    return { friction: 50, tension: 250 };
  }, [isHovered, isPressed, isActive]);

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const startHover = () => {
    setIsHovered(true);
  };

  const stopHover = () => {
    setIsHovered(false);
  };

  const shadowCallback = useCallback(() => {
    if (isActive || isPressed)
      return "translate(0px, 0px) scaleY(0.94) scaleX(1)";
    if (isHovered) return "translate(3px, 5px) scaleY(1) scaleX(1.02)";
    return "translate(2px, 3px) scaleY(1) scaleX(1.01)";
  }, [isPressed, isHovered, isActive]);

  const shadowProps = useSpring({
    from: { transform: "translate(2px, 3px) scaleX(1)" },
    to: { transform: shadowCallback() },
    config: parseConfig()
  });

  const edgeCallback = useCallback(() => {
    if (isActive) return "translateY(3px) scaleY(0.88)";
    if (isPressed) return "translateY(2px) scaleY(0.925)";
    return "translateY(0px) scaleY(1)";
  }, [isPressed, isActive]);

  const edgeProps = useSpring({
    from: { transform: "translateY(0px) scaleY(1)" },
    to: {
      transform: edgeCallback()
    },
    config: parseConfig()
  });

  const frontCallback = useCallback(() => {
    if (isActive) return "translateY(3px) scaleY(0.88)";
    if (isPressed) return "translateY(2px) scaleY(0.925)";
    if (isHovered) return "translateY(-5px) scaleY(1)";
    return "translateY(-3px) scaleY(1)";
  }, [isHovered, isPressed, isActive]);

  const frontProps = useSpring({
    from: {
      transform: "translateY(-3px) scaleY(1)"
    },
    to: {
      transform: frontCallback()
    },
    config: parseConfig()
  });

  const innerShadowCallback = useCallback(() => {
    if (isActive) return { opacity: "70%" };
    if (isPressed) return { opacity: "60%" };
    return { opacity: "0%" };
  }, [isPressed, isActive]);

  const innerShadowProps = useSpring({
    from: { opacity: "0%" },
    to: innerShadowCallback(),
    config: parseConfig()
  });

  const iconCallback = useCallback(() => {
    if (isActive) return "translateY(5px)";
    if (isPressed) return "translateY(4px)";
    if (isHovered) return "translateY(-5px)";
    return "translateY(-3px)";
  }, [isHovered, isPressed, isActive]);

  const iconProps = useSpring({
    from: { transform: "translateY(-3px" },
    to: { transform: iconCallback() },
    config: parseConfig()
  });

  const buttonIconProps = useSpring({
    from: {color: "grey"},
    to: {color: isPressed ? "#38CC77" : "grey"},
  })

  return (
    <label
      onMouseEnter={startHover}
      onMouseLeave={stopHover}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseUp}
      className="button-wrapper"
      role="button"
      onClick={pressButton}
    >
      <animated.span
        aria-disabled="true"
        style={shadowProps}
        className="shadow"
      />
      <animated.span aria-disabled="true" style={edgeProps} className="edge" />
      <animated.span aria-disabled="true" style={frontProps} className="front">
        <animated.span
          aria-disabled="true"
          style={innerShadowProps}
          className="inner-shadow"
        ></animated.span>
      </animated.span>
      <animated.div style={iconProps} className="playpause-icon">
        <StyledPlayPause style={buttonIconProps} />
      </animated.div>
    </label>
  );
};

export default PlayPauseButton;
