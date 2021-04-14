import { Component } from 'react'
import { connect } from 'react-redux'
import { saveVamp, getVamp, editVamp } from '../actions/vampActions'
import * as Tone from 'tone'
import './Noisemaker.css'

import classNames from 'classnames/bind'
import SaveVampModal from './SaveVampModal'
// import Recorder from './Recorder'
import Note from './Note'

class NoiseMaker extends Component {

  state = {
    activated: false,
    playing: false,
    synths: NoiseMaker.makeSynths(),
    grid: NoiseMaker.makeGrid(),
    beat: 0,
    tempo: 120,
    volume: parseFloat(-20), 
    blob: null,
    modalDisplayed: false,
    name: ''
  }

  // makeRecorder = () => {
  //   const ctx = Tone.context;
  //   const dest = ctx.createMediaStreamDestination();

  //   this.state.synths.forEach(synth => {
  //     synth.connect(dest)
  //   })

  //   const recorder = new MediaRecorder(dest.stream);

  //   return recorder
  // }

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

  componentDidMount(){
    if(!!this.props.vampId){
      if(this.props.vamps.length > 0){
        let vamp = this.props.vamps.find(vamp => vamp.id === this.props.vampId)
        this.setState({grid: vamp.notation, name: vamp.name, tempo: vamp.tempo, volume: vamp.volume})
      }else{
        this.props.getVamp(this.props.vampId)
      }
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.vamps.length === 0 && !!prevProps.vampId && this.props.vamps.length > 0){
      let vamp = this.props.vamps.find(vamp => vamp.id === this.props.vampId)
      this.setState({grid: vamp.notation, tempo: vamp.tempo, volume: vamp.volume})
    }
  }

  componentWillUnmount(){
    Tone.Transport.stop()
    Tone.Transport.cancel()
    this.state.synths.forEach(synth => synth.dispose())
    this.props.clearErrors()
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
      Tone.getDestination().volume.rampTo(this.state.volume, 0.001)
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
    Tone.Transport.bpm.rampTo((e.target.value - 10), .1)
  }

  handleVolumeChange = (e) => {
    this.setState({volume: parseFloat(e.target.value)})
    Tone.getDestination().volume.rampTo(parseFloat(e.target.value), 0.001)
  }

  displayVolume = () => {
    const volumeDisplay = Math.round((this.state.volume + 20) * 10)/10
    return volumeDisplay
  }

  // constructAudioConfigObj = (blob) => {
  //   console.log('constructing configObj!')
  //   const formData = new FormData()
  //   formData.append('recording', blob)

  //   const configObj = {
  //     method: "POST",
  //     headers: {
  //       "Accept": "application/json"
  //     },
  //     body: formData
  //   }

  //   return configObj
  // }

  // saveRecording = (blob) => {
  //   const configObj = this.constructAudioConfigObj(blob)

  //   console.log('about to fetch')
  //   fetch('http://localhost:3001/noodles', configObj).then(resp => resp.json()).then(json => console.log(json))
  //   console.log('fetch completed')
    
  // }

  // constructVampConfigObj = () => {
  //   const formData = new FormData()
  //   const grid = JSON.stringify(this.state.grid)
  //   formData.append('notation', grid)
  //   debugger
  //   const configObj = {
  //     method: "POST",
  //     headers: {
  //       "Accept": "application/json"
  //     },
  //     body: formData
  //   }

  //   return configObj
  // }

  displayModal = () => {
    this.setState({modalDisplayed: true})
  }

  hideModal = () => {
    this.props.clearErrors()
    this.setState({modalDisplayed: false})
  }

  handleOnSubmit = (e) => {
    e.preventDefault()
    this.props.clearErrors()
    if(this.props.vampId){
      this.props.editVamp({
        id: this.props.vampId, 
        name: this.state.name, 
        notation: this.state.grid,
        volume: this.state.volume,
        tempo: this.state.tempo
      })
    }else{
      this.props.saveVamp({
        name: this.state.name, 
        notation: this.state.grid,
        volume: this.state.volume,
        tempo: this.state.tempo
      })
    }
  }

  handleOnChange = (e) => {
    this.setState({name: e.target.value})
  }

  renderModal = () => {
    if(!!this.state.modalDisplayed){
      if(!!this.props.vampId){
        let vamp = this.props.vamps.find(vamp => vamp.id === this.props.vampId)
        return <SaveVampModal 
        status={this.props.status}
        vamp={vamp}
        error={this.props.error}
        pending={this.props.pending} 
        handleOnSubmit={this.handleOnSubmit} 
        handleOnChange={this.handleOnChange} 
        hideModal={this.hideModal} /> 
      }else{
        return <SaveVampModal 
        status={this.props.status}
        error={this.props.error}
        pending={this.props.pending} 
        handleOnSubmit={this.handleOnSubmit} 
        handleOnChange={this.handleOnChange} 
        hideModal={this.hideModal} /> 
      }
    }
  }

  render(){
    return(
      <div className="tones">
        {this.renderModal()}
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
        value={this.state.tempo || 120} 
        onChange={this.handleTempoChange}/>

        {/* Display Tempo */}
        <p 
        className="tempo-display content">
          {this.state.tempo}
        </p>

        {/* Volume Slider */}
        <input
        className="volume-slider"
        type="range"
        min={-40}
        max={0}
        step={0.1}
        value={this.state.volume || -20}
        onChange={this.handleVolumeChange}
        />
        <p className="volume-display content">
          {this.displayVolume()}
        </p>

        <button className="button is-rounded" onClick={this.displayModal}>{!!this.props.vampId ? 'Save Changes' : 'Save Vamp'}</button>
        {/* <Recorder saveRecording={this.saveRecording} recorder={this.makeRecorder()} /> */}
        
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getVamp: (vampId) => dispatch(getVamp(vampId)),
  clearErrors: () => dispatch({type:'CLEAR_ERRORS'}),
  saveVamp: (vamp) => dispatch(saveVamp(vamp)),
  editVamp: (vamp) => dispatch(editVamp(vamp))
})

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  pending: state.vamp.pending,
  error: state.vamp.error,
  vamps: state.vamp.vamps,
  status: state.vamp.status
})

export default connect(mapStateToProps, mapDispatchToProps)(NoiseMaker)