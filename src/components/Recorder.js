import React, {Component} from 'react'
import * as Tone from 'tone'

class Recorder extends Component {

  state = {
    isRecording: false,
    recorder: this.props.recorder,
    chunks: []
  }

  configRecorder = (recorder) => {

    const updatedRecorder = this.state.recorder

    updatedRecorder.ondataavailable = e => {
      console.log('inside ondataavailable function! type is audio/wav')
      console.log(e.data)
      this.setState({chunks: [...this.state.chunks, e.data]}, () => {
        console.log(this.state.chunks)
        this.displayBlob()
      })
    }

    return updatedRecorder
  }

  componentDidMount(){
    this.setState({recorder: this.configRecorder(this.state.recorder)})
  }

  toggleRecording = (e) => {
    this.state.isRecording ? this.stopRecording(e) : this.startRecording(e)
  }

  startRecording = (e) => {
    e.target.innerHTML = 'Stop Recording'
    this.state.recorder.start()
    console.log('recording started')
    console.log(this.state.recorder.state)
    this.setState({isRecording: true})
  }

  stopRecording = async (e) => {
    e.target.innerHTML = "Start Recording";
    await this.state.recorder.stop();
    this.setState({isRecording: false})
  }

  displayBlob = () => {
    const audio = document.getElementById('audio-track')

    const mp3 = new Blob(this.state.chunks, { 'type': 'audio' })
    const media = URL.createObjectURL(mp3)
    audio.src = media;
  }

  saveRecording = () => {
    
  }

  render(){
    return(
      <div id="recorder">
        <button id="record-button" onClick={this.toggleRecording} className="button is-rounded" >Record</button>
        <audio style={{margin: 'auto'}} id="audio-track" controls></audio>
        <button id="save-recording" onClick={this.saveRecording}>Save Recording</button>
      </div>
    )
  }

}

export default Recorder