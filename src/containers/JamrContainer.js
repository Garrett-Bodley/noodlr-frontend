import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Tone from 'tone'
import Key from '../components/Jamr/Key'
import './JamrContainer.css'

class JamrContainer extends Component{

  state = {
    synth: JamrContainer.makeSynth(),
    // keyboardControls: JamrContainer.makeKeyboardControls()
  }

  static makeSynth = () => {
    return new Tone.PolySynth(Tone.Synth).set({ oscillator: { type: 'triangle8' } }).toDestination()
  }

  // static makeKeyboardControls = () => {
  //   let notes = ['F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3', 'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4']
  //   let keys = ['a', 'w', 's', 'e', 'd', 'f', 'g', 'y', 'h', 'u', 'j', 'i', 'k']
  //   const keyboardControls = {}
  //   for(let i = 0; i < notes.length; i++){
  //     keyboardControls[keys[i]] = {pressed: false, note: notes[i]}
  //   }
  //   return keyboardControls
  // }

  // handleKeyDown = (e) => {
  //   const key = e.key.toLowerCase();
  //   if(this.state.keyboardControls[key] && !this.state.keyboardControls[key].pressed){
  //     this.state.synth.triggerAttack(this.state.keyboardControls[key].note)
  //     const newControls = Object.assign({}, this.state.keyboardControls)
  //     newControls[key].pressed = true
  //     this.setState( { keyboardControls: newControls } )
  //   }
  // }

  // handleKeyUp = (e) => {
  //   const key = e.key.toLowerCase();
  //   if(this.state.keyboardControls[key] && this.state.keyboardControls[key].pressed){
  //     this.state.synth.triggerRelease(this.state.keyboardControls[key].note)
  //     const newControls = Object.assign({}, this.state.keyboardControls)
  //     this.setState( { keyboardControls: newControls } )
  //   }
  // }
  
  handleMouseDown = (note) => {
    this.state.synth.triggerAttack(note)
  }

  handleMouseUp = (note) => {
    this.state.synth.triggerRelease(note)
  }

  handleMouseOut = (note) => {
    this.state.synths.triggerRelease(note)
  }

  makeWhiteKeys = () => {
    let notes = ['F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4']
    return notes.map(note => 
      <Key 
        note={note} 
        handleMouseDown={() => this.handleMouseDown(note)} 
        handleMouseUp={() => this.handleMouseUp(note)}
        handleMouseOut={() => this.handleMouseOut(note)} 
      />
    )
  }


  render(){
    return(
      <div id="jamr-container">

        <div className="white-keys">
          {this.makeWhiteKeys()}
        </div>
        
      </div>
    )
  }

}

export default connect()(JamrContainer)