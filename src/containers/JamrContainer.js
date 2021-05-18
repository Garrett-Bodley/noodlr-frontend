import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Tone from 'tone'
import Key from '../components/Jamr/Key'

class JamrContainer extends Component{

  state = {
    synths: JamrContainer.makeSynths(),
    keyboardControls: 
  }

  static makeSynths = () => {
    const synths = []
    for(let i = 0; i < 12; i++){
      let synth = new Tone.Synth({oscillator: {type: 'triangle8'}}).toDestination()
      synths.push(synth)
    }
    return synths
  }

  static makeKeyboardControls = () => {
    let notes = ['F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3', 'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4']
    let keys = ['a', 'w', 's', 'e', 'd', 'f', 'g', 'y', 'h', 'u', 'j', 'i', 'k']
    const keyboardControls = {}
    for(let i = 0; i < notes.length; i++){
      keyboardControls[keys[i]] = {pressed: false, note: notes[i]}
    }
    return keyboardControls

  }

  handleOnClick = (note) => {

  }

  makeKeys = () => {
    const keys = []
    for(let i = 0; i < 8; i++){
      keys.push(<Key onClick={(note) => this.handleOnClick(note)} note={} />)
    }

  }


  render(){
    return(
      <div id="jammr-container">





      </div>
    )
  }

}

export default connect()(JamrContainer)