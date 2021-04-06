import React, { Component } from 'react'
import NoiseMaker from '../components/Noisemaker'


const NoisemakerContainer = ({match}) => {
  // console.log(match)

  if(!!match && match.path === '/vamps/:id'){
    const vampId = match.params.id
    return(
      <div id="noisemakerContainer">
        <NoiseMaker vampId={vampId} />
      </div>
    )
  }else{
    return(
      <div id="noisemakerContainer">
        <NoiseMaker />
      </div>
    )
  }
}

export default NoisemakerContainer