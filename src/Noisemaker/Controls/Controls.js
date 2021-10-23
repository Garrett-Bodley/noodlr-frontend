import React from "react";
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
  ${border};
  ${flexbox};
  ${layout};
  ${space};
  ${typography};
`

const Controls = (props) => {

  const tempo = useTempo()
  const updateTempo = useTempoUpdate()
  const volume = useVolume()
  const updateVolume = useVolumeUpdate()

  const handleTempoChange = (e) => {
    updateTempo(parseFloat(e.target.value))
  }

  const handleVolumeChange = (e) => {
    updateVolume(e.target.value === "0" ? -Infinity : e.target.value - 45)
  }

  return (
    <Article
      bg="#f8f8ff"
      {...props}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gridTemplateColumns=""
      borderRadius="3px"
      my="1em"
      border="1px solid black"
    >
      <Container display="flex" alignItems="center" justifyContent="center" width="100%">
        <MetronomeIcon className="icon" fill="grey" strokeWidth="5px" />
        <Range eventHandler={handleTempoChange} min={60} max={180} value={tempo} />
      </Container>
      <Container display="flex" textAlign="left" alignItems="center" justifyContent="center" width="100%">
        <VolumeIcon className="icon"/>
        <Range eventHandler={handleVolumeChange} min={0} max={50} value={volume === -Infinity ? 0 : volume + 45} />
      </Container>
      <PlayPauseButton/>
    </Article>
  );
};

export default Controls;
