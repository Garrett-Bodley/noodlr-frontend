import React from "react";
import "./controls.css"
import styled from "styled-components";
import { border, color, flexbox, grid, space, typography, layout } from "styled-system";
import { VideoPlayPause } from "@styled-icons/fluentui-system-filled/VideoPlayPause";
import { useTempo, useTempoUpdate, useVolume, useVolumeUpdate } from "../../utilities/ToneProvider";
import PlayPauseButton from "./PlayPauseButton";
import VolumeIcon from "./VolumeIcon"
import MetronomeIcon from "./MetronomeIcon"
import Range from "./Range"
const Article = styled.article`
  ${border}
  ${color};
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 17em;

  ${border};
  ${flexbox};
  ${layout};
  ${space};
  ${typography};
`

const Controls = (props) => {

  const [tempo, setTempo] = useTempo()
  const [volume, setVolume] = useVolume()

  const handleTempoChange = (e) => {
    setTempo(parseFloat(e.target.value))
  }

  const handleVolumeChange = (e) => {
    setVolume(e.target.value === "0" ? -Infinity : e.target.value - 45)
  }

  return (
    <Article
      {...props}
      className="controls"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gridTemplateColumns=""
      borderRadius="8px"
      m="1em"
      maxWidth="20em"
      border="1px solid #faebd7"
    >
      <Container>
          <span className="controls-label"><MetronomeIcon className="icon icon-metronome"/>TEMPO</span>
          <Range eventHandler={handleTempoChange} min={60} max={180} value={tempo} />
      </Container>
      <Container>
        <span className="controls-label"><VolumeIcon className="icon icon-volume"/> VOLUME</span>
        <Range eventHandler={handleVolumeChange} min={0} max={50} value={volume === -Infinity ? 0 : volume + 45} />
      </Container>
      <PlayPauseButton/>
    </Article>
  );
};

export default Controls;
