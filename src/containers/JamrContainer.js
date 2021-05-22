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
  
  handleMouseDown = (e, note) => {
    this.state.synth.triggerAttack(note)
  }

  handleMouseUp = (e, note) => {
    this.state.synth.triggerRelease(note)
  }

  handleMouseEnter = (e, note) => {
    // Mouseover triggers a new note if primary mouse button is clicked
    if(e.buttons === 1){
      this.state.synth.triggerAttack(note)
    }
  }

  handleMouseLeave = (note) => {
    this.state.synth.triggerRelease(note)
  }

  makeWhiteKeys = () => {
    let notes = ['F3', 'G3', 'A3', 'Bb3', 'C4', 'D4', 'E4', 'F4']
    let color = 'EEEAD8'
    return notes.map((note, index) => 
      <Key 
        key={index}
        note={note}
        color={color} 
        handleMouseDown={(e) => this.handleMouseDown(e, note)} 
        handleMouseUp={(e) => this.handleMouseUp(e, note)}
        handleMouseEnter={(e) => this.handleMouseEnter(e, note)}
        handleMouseLeave={() => this.handleMouseLeave(note)} 
      />
    )
  }

  makeBlackKeys = () => {
    let notes = ['Gb3', 'Ab3', 'B3', 'Db4', 'Eb4']
    let color = '0a0502'
    return notes.map((note, index) => 
      <Key 
      key={index}
      note={note}
      color={color}
      handleMouseDown={(e) => this.handleMouseDown(e, note)} 
      handleMouseUp={(e) => this.handleMouseUp(e, note)}
      handleMouseEnter={(e) => this.handleMouseEnter(e, note)}
      handleMouseLeave={() => this.handleMouseLeave(note)} 
      />
    )
  }


  render(){
    return(
      <div id="jamr-container">
        <div className="black-keys">
          {this.makeBlackKeys()}
        </div>
        <div className="white-keys">
          {this.makeWhiteKeys()}
        </div>
        
      </div>
    )
  }

}

export default connect()(JamrContainer)