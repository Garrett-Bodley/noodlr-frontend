import React, { Component } from 'react'
import NoiseMaker from '../components/Noisemaker'

class NoisemakerContainer extends Component {

  render(){
    return(
      <div id="noisemakerContainer">
        <NoiseMaker />
      </div>
    )
  }

}

export default NoisemakerContainer