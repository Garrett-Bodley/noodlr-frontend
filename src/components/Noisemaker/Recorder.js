import React, {Component} from 'react'

class Recorder extends Component {

  state = {
    isRecording: false,
    recorder: this.props.recorder,
    chunks: []
  }

  configRecorder = () => {

    const updatedRecorder = this.state.recorder

    updatedRecorder.ondataavailable = e => {
      this.setState({chunks: [...this.state.chunks, e.data]}, this.displayBlob)
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
    this.setState({isRecording: true})
  }

  stopRecording = async (e) => {
    e.target.innerHTML = "Start Recording";
    await this.state.recorder.stop();
    this.setState({isRecording: false})
  }

  chunksToBlob = () => {
    return new Blob(this.state.chunks, { 'type': 'audio' })
  }

  displayBlob = () => {
    const audio = document.getElementById('audio-track')

    const recording = new Blob(this.state.chunks, { 'type': 'audio' })
    const media = URL.createObjectURL(recording)
    audio.src = media;
  }

  render(){
    return(
      <div id="recorder">
        <button id="record-button" onClick={this.toggleRecording} className="button is-rounded" >Record</button>
        <audio style={{margin: 'auto'}} id="audio-track" controls></audio>
        <button id="save-recording" className="button is-rounded" onClick={() => this.props.saveRecording(this.chunksToBlob())}>Save Recording</button>
      </div>
    )
  }

}

export default Recorder