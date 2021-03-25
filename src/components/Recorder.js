import React, {Component} from 'react'
import * as Tone from 'tone'

class Recorder extends Component {

  state = {
    isRecording: false,
    blob: null
  }

  toggleRecording = (e) => {
    this.state.isRecording ? this.stopRecording(e) : this.startRecording(e)
  }

  startRecording = (e) => {
    e.target.innerHTML = 'Stop Recording'
    this.props.recorder.start()
    console.log('recording started')
    console.log(this.props.recorder.state)
    this.setState({isRecording: true})
  }

  stopRecording = async (e) => {
    e.target.innerHTML = "Start Recording";
    await this.props.recorder.stop();

    console.log('recording stopped');
    console.log(this.props.recorder.state)
    console.log(this.state.blob)

    this.setState({isRecording: false})
  }

  displayBlob = () => {
    const audio = document.getElementById('audio-track')
    const media = this.state.blob
    audio.src = media;
  }

  render(){
    return(
      <div id="recorder">
        <button id="record-button" onClick={this.toggleRecording} className="button is-rounded" >Record</button>
        <audio style={{margin: 'auto'}} id="audio-track" controls></audio>
      </div>
    )
  }

}

export default Recorder