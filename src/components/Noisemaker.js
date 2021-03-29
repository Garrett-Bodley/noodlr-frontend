import { Component } from 'react'
import * as Tone from 'tone'

import classNames from 'classnames/bind'
import Recorder from './Recorder'
import Note from './Note'

class NoiseMaker extends Component {

  state = {
    activated: false,
    playing: false,
    synths: NoiseMaker.makeSynths(),
    grid: NoiseMaker.makeGrid(),
    beat: 0,
    tempo: 120,
    blob: null,
  }

  makeRecorder = () => {
    const ctx = Tone.context;
    const dest = ctx.createMediaStreamDestination();

    this.state.synths.forEach(synth => {
      synth.connect(dest)
    })

    const recorder = new MediaRecorder(dest.stream);

    return recorder
  }

  static makeSynths = () => {

    // Make pitched synths
    const synths = []
    for(let i = 0; i < 6; i++){
      let synth = new Tone.Synth({oscillator: {type: 'square8'}}).toDestination()
      synths.push(synth)
    }
    
    // Make 3 Samplers for Drum sounds.
    for(let i = 0; i < 3; i++){
      let drums = new Tone.Sampler({
        urls: {
          C3: 'hihat.mp3',
          C2: 'snare.mp3',
          C1:  'kick.mp3'
        },
        baseUrl: 'https://tonejs.github.io/audio/drum-samples/CR78/'
      }).toDestination()
      synths.push(drums)
    }

    return synths
  }

  static makeGrid = () => {

    const notes = ['F4', 'Eb4', 'C4', 'Bb3', 'Ab3', 'F3', 'C3', 'C2', 'C1']
    const rows = []

    for(const note of notes){
      const row = []
      for(let i = 0; i < 16; i++){
        row.push({note: note, isActive: false})
      }
      rows.push(row)
    }

    return rows
  }

  playMusic = () => {

    
    const repeat = (time) => {
      let beat = this.state.beat

      this.state.grid.forEach( (row, index) => {
        let synth = this.state.synths[index]
        let note = row[beat]
        if (note.isActive){
          synth.triggerAttackRelease(note.note, '8n', time)
        }
      })

      this.setState({beat: (this.state.beat + 1) % 16})
    }

    Tone.Transport.bpm.value = this.state.tempo
    Tone.Transport.scheduleRepeat(repeat, "8n")
    Tone.Transport.start()

  }

  handleOnClick = (clickedRowIndex, clickedNoteIndex) => {
    let newRows = this.state.grid.map((row, rowIndex) => {
      return row.map((note, noteIndex) => {
        let newNote = note;
        if(clickedRowIndex === rowIndex && clickedNoteIndex === noteIndex){
          newNote.isActive = !note.isActive
        }
        return newNote
      })
    })

    this.setState({rows: newRows})
  }

  renderGrid = () => {
    let colors = [
      ['239, 50, 217', '137, 255, 253'],
      ['239, 50, 217', '137, 255, 253'],

      ['5, 118, 230', '0, 242, 97'],
      ['5, 118, 230', '0, 242, 97'],
      
      ['194, 21, 0', '255, 197, 0'],
      ['194, 21, 0', '255, 197, 0'],

      ['40, 60, 134', '255, 0, 204'],
      ['40, 60, 134', '255, 0, 204'],
      ['40, 60, 134', '255, 0, 204'],
    ]

    
    let grid = this.state.grid.map((row, rowIndex) => {
      return <div key={rowIndex} className="note-row">
        {row.map(({note, isActive}, noteIndex) => {
          return(
            <Note 
            color={colors[rowIndex]} 
            className={classNames("note", {"on-beat": this.state.beat === (noteIndex + 1) % 16}, {'note-is-active': isActive})} 
            key={noteIndex + note} 
            isActive={isActive} 
            note={note} 
            onClick={() => this.handleOnClick(rowIndex, noteIndex)} 
            />
          )
        })}
      </div>
    })

    return grid
  }

  togglePlay = () => {
    if(!this.state.activated){
      Tone.start()
      this.setState({activated: true, playing: true})
      this.playMusic()
      return
    }

    if(!this.state.playing){
      Tone.Transport.start()
      this.setState({playing: true})
    }else{
      Tone.Transport.stop();
      this.setState({playing: false})
    }
  }

  handleTempoChange = (e) => {
    this.setState({tempo: e.target.value})
    Tone.Transport.bpm.rampTo(e.target.value, .5)
  }

  makeFormData = () => {

  }

  constructConfigObj = (blob) => {
    console.log('constructing configObj!')
    const formData = new FormData()
    formData.append('recording', blob)

    const configObj = {
      method: "POST",
      headers: {
        "Accept": "application/json"
      },
      body: formData
    }

    return configObj
  }

  saveRecording = (blob) => {
    const configObj = this.constructConfigObj(blob)

    console.log('about to fetch')
    fetch('http://localhost:3001/noodles', configObj).then(resp => resp.json()).then(json => console.log(json))
    console.log('fetch completed')
    
  }


  render(){
    return(
      <div className="tones">

        {/* Sequencer Buttons */}
        {this.renderGrid()}

        {/* Stop/Start button */}
        <button 
        className={
          classNames(
            'button',
            'is-rounded',
            'play-button', 
            {'play-button-playing': this.state.playing},
            {'play-button-stopped': !this.state.playing}
          )
        } 
        onClick={this.togglePlay}>
          {this.state.playing ? 'Stop' : 'Start'}
        </button>

        {/* Adjust Tempo */}
        <input 
        className="tempo-slider" 
        type="range" 
        min={40} 
        max={200} 
        step={1} 
        value={this.state.tempo} 
        onChange={this.handleTempoChange}/>

        {/* Display Tempo */}
        <p 
        className="tempo-display">
          {this.state.tempo}
        </p>
        <Recorder saveRecording={this.saveRecording} recorder={this.makeRecorder()} />
        
      </div>
    )
  }
}

export default NoiseMaker