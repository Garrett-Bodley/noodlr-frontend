import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { color, flexbox, grid, space, layout } from 'styled-system'
import { VideoPlayPause } from '@styled-icons/fluentui-system-filled/VideoPlayPause';
import { useToneUpdate } from '../../utilities/SynthUtilities/ToneContext'
import { useVamp } from '../../utilities/VampUtilities/VampProvider'
import * as Tone from 'tone'
import makeSynths from '../../utilities/SynthUtilities/makeSynths';

const Article = styled.article`
  ${space};
  ${layout};
  ${flexbox}
  ${grid}
`

const StyledPlayPause = styled(VideoPlayPause)`
  ${color};
  ${layout};
  ${space};
`

const Controls = (props) => {

  const [isActivated, setIsActivated] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false);
  const [beat, setBeat] = useState(0)
  const [tempo, setTempo] = useState(120)
  const vamp = useVamp()
  const synths = useRef([...makeSynths(Tone)]).current

  const playMusic = () => {
    const repeat = (time) => {

      vamp.forEach((row, index) => {
        let tone = row[beat];
        if (tone.isActive) {
          synths[index].triggerAttackRelease(tone.pitch, "8n", time);
        }
      });
      setBeat((beat + 1) % 16)
    };

    Tone.Transport.bpm.value = tempo;
    Tone.Transport.scheduleRepeat(repeat, "8n");
    Tone.Transport.start();
  };

  const togglePlay = () => {
    if (!isActivated) {
      Tone.start().then(() => {
        setIsActivated(true)
        playMusic()
        setIsPlaying(true)
      })
      return
    }
    isPlaying ? Tone.Transport.stop() : Tone.Transport.start()
    setIsPlaying((prevState) => !prevState);
  };


  return (
    <Article {...props} display="flex" justifyContent="center" alignItems="center" gridTemplateColumns="">
      <StyledPlayPause width="2em" onClick={togglePlay} />
    </Article>
  )
}

export default Controls