import React from "react";
import styled from "styled-components";
import { color, flexbox, grid, space, layout } from "styled-system";
import { VideoPlayPause } from "@styled-icons/fluentui-system-filled/VideoPlayPause";
import { useToneUpdate } from "../../utilities/ToneContext";
const Article = styled.article`
  ${space};
  ${layout};
  ${flexbox}
  ${grid}
`;

const StyledPlayPause = styled(VideoPlayPause)`
  ${color};
  ${layout};
  ${space};
`;

const Controls = (props) => {
  const togglePlay = useToneUpdate();

  return (
    <Article
      {...props}
      display="flex"
      justifyContent="center"
      alignItems="center"
      gridTemplateColumns=""
    >
      <StyledPlayPause width="2em" onClick={togglePlay} />
    </Article>
  );
};

export default Controls;
