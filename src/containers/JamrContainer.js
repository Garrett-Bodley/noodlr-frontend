import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Tone from 'tone'
import Key from '../components/Jamr/Key'
import './JamrContainer.css'

class JamrContainer extends Component{

  state = {
    synth: JamrContainer.makeSynth(),
    keyboardControls: JamrContainer.makeKeyboardControls()
  }

  static makeSynth = () => {
    return new Tone.PolySynth(Tone.Synth).set({ oscillator: { type: 'triangle8' } }).toDestination()
  }

  static makeKeyboardControls = () => {
    let whiteNotes = ['F3', 'G3', 'A3', 'Bb3', 'C4', 'D4', 'E4', 'F4']
    let whiteKeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k']

    let blackNotes = ['Gb3', 'Ab3', 'B3', 'Db4', 'Eb4']
    let blackKeys =  ['w', 'e', 't', 'y', 'u']

    const keyboardControls = {}

    whiteNotes.forEach((note, index) => {
      keyboardControls[whiteKeys[index]] = {pressed: false, note: note}
    })

    blackNotes.forEach((note, index) => {
      keyboardControls[blackKeys[index]] = {pressed: false, note: note}
    })

    return keyboardControls

  }

  handleKeyDown = (e) => {
    // debugger
    const key = e.key.toLowerCase();
    if(this.state.keyboardControls[key] && !this.state.keyboardControls[key].pressed){
      let note = this.state.keyboardControls[key].note
      document.getElementById(note).firstElementChild.checked = true

      this.state.synth.triggerAttack(this.state.keyboardControls[key].note)
      const newControls = Object.assign({}, this.state.keyboardControls)
      newControls[key].pressed = true
      this.setState( { keyboardControls: newControls } )
    }
  }

  handleKeyUp = (e) => {
    const key = e.key.toLowerCase();
    if(this.state.keyboardControls[key] && this.state.keyboardControls[key].pressed){
      let note = this.state.keyboardControls[key].note
      document.getElementById(note).firstElementChild.checked = false

      this.state.synth.triggerRelease(this.state.keyboardControls[key].note)
      const newControls = Object.assign({}, this.state.keyboardControls)
      newControls[key].pressed = false
      this.setState( { keyboardControls: newControls } )
    }
  }
  
  handleOnClick = e => {
    e.preventDefault()
  }

  handleMouseDown = (e, note) => {
    e.preventDefault()
    if(!e.target.parentElement.firstElementChild.checked){
      e.target.parentElement.firstElementChild.checked = true
    }
    this.state.synth.triggerAttack(note)
  }

  handleMouseUp = (e, note) => {
    e.preventDefault()
    if(e.target.parentElement.firstElementChild.checked){
      e.target.parentElement.firstElementChild.checked = false
    }
    this.state.synth.triggerRelease(note)
  }

  handleMouseEnter = (e, note) => {
    // Mouseover triggers a new note if primary mouse button is clicked
    if(e.buttons === 1 && !e.target.parentElement.firstElementChild.checked){
      e.target.parentElement.firstElementChild.checked = true
      this.state.synth.triggerAttack(note)
    }
  }

  handleMouseLeave = (e, note) => {
    if(e.target.parentElement.firstElementChild.checked){
      e.target.parentElement.firstElementChild.checked = false;
    }
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
        handleMouseLeave={(e) => this.handleMouseLeave(e, note)} 
        handleOnClick={this.handleOnClick}
      />
    )
  }

  makeBlackKeys = () => {
    let notes = ['Gb3', 'Ab3', '', 'B3', 'Db4', 'Eb4', '']
    let color = '0a0502'
    return notes.map((note, index) => {

      if(index === 2 || index === 6){
        return <Key key={index} hidden={true} />
      }else{
        return (
          <Key 
          key={index}
          note={note}
          color={color}
          handleMouseDown={(e) => this.handleMouseDown(e, note)} 
          handleMouseUp={(e) => this.handleMouseUp(e, note)}
          handleMouseEnter={(e) => this.handleMouseEnter(e, note)}
          handleMouseLeave={(e) => this.handleMouseLeave(e, note)} 
          handleOnClick={ this.handleOnClick }
          />
        )
      }
    })
  }


  render(){
    return(
      <div id="jamr-container"
        onKeyDown={ this.handleKeyDown }
        onKeyUp= { this.handleKeyUp }
        tabIndex={ -1 }
      >
        <div className="black-keys">
          { this.makeBlackKeys() }
        </div>
        <div className="white-keys">
          { this.makeWhiteKeys() }
        </div>
        
      </div>
    )
  }

}

export default connect()(JamrContainer)