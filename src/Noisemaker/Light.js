import React from 'react'
import styled from 'styled-components'
import {animated, config, useSpring} from 'react-spring'
import useBeat from "../utilities/ToneProvider"

const StatusLight = styled(animated.div)`
  margin: auto;
  width: 0.75em;
  height: 0.75em;
  background-color: hsl(0, 100%, 50%);
  border-radius: 50%;
  box-shadow: 
    hsla(0, 50%, 40%, 0.705) 1px 1px 5px 1px,
    inset #441313 -1px -1px 2px;
  will-change: filter;
`

const Light = ({isActive}) => {

  const props = useSpring({
    from: {filter: "brightness(100%)"},
    to: {filter: isActive ? "brightness(200%)" : "brightness(100%)"},
    config: {
      duration: 50,
      ...config.stiff
    }
  })

  return (
    <StatusLight style={props}>
    </StatusLight>
  )
}

export default Light
