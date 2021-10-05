import { Component } from "react";
import { connect } from "react-redux";
import * as Tone from "tone";
import * as LZString from "lz-string";
import "./Noisemaker.css";

import { saveVamp, getVamp, editVamp } from "../../actions/vampActions";
import DisplayGrid from "./DisplayGrid";
import SaveVampModal from "./SaveVampModal";
import PlayButton from "./PlayButton";
import TempoDisplay from "./TempoDisplay";
import VolumeDisplay from "./VolumeDisplay";
import ShareModal from "./ShareModal";
// import Recorder from './Recorder'

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
    name: "",
  };

  makeRecorder = () => {
    const ctx = Tone.context;
    const dest = ctx.createMediaStreamDestination();

    this.state.synths.forEach((synth) => {
      synth.connect(dest);
    });

    const recorder = new MediaRecorder(dest.stream);

    return recorder;
  };

  static makeSynths = () => {
    // Make pitched synths
    const synths = [];
    for (let i = 0; i < 6; i++) {
      let synth = new Tone.Synth({
        oscillator: { type: "square8" },
      }).toDestination();
      synths.push(synth);
    }

    // Make 3 Samplers for Drum sounds.
    for (let i = 0; i < 3; i++) {
      let drums = new Tone.Sampler({
        urls: {
          C3: "hihat.mp3",
          C2: "snare.mp3",
          C1: "kick.mp3",
        },
        baseUrl: "https://tonejs.github.io/audio/drum-samples/CR78/",
      }).toDestination();
      synths.push(drums);
    }

    return synths;
  };

  static makeGrid = () => {
    const notes = ["F4", "Eb4", "C4", "Bb3", "Ab3", "F3", "C3", "C2", "C1"];
    const rows = [];

    for (const note of notes) {
      const row = [];
      for (let i = 0; i < 16; i++) {
        row.push({ note: note, isActive: false });
      }
      rows.push(row);
    }

    return rows;
  };

  componentDidMount() {
    // Check if a vampId is being passed down from router props
    if (!!this.props.vampId) {
      if (this.props.vamps.length > 0) {
        // If the current url denotes a vampId, load corresponding vamp from the store
        let vamp = this.props.vamps.find(
          (vamp) => vamp.id === this.props.vampId
        );
        this.setState({
          grid: vamp.notation,
          name: vamp.name,
          tempo: vamp.tempo,
          volume: vamp.volume,
        });
      } else {
        // otherwise execute the getVamp action, querying the backend to load the specific vamp
        this.props.getVamp(this.props.vampId);
      }
    } else if (this.props.queryString) {
      this.loadQueryData(this.props.queryString);
    }
  }

  componentDidUpdate(prevProps) {
    // Component will update when executing getVamp action.
    // Load the vamp corresponding to the id designated in the current url (passed as router props)
    if (
      prevProps.vamps.length === 0 &&
      !!prevProps.vampId &&
      this.props.vamps.length > 0
    ) {
      let vamp = this.props.vamps.find((vamp) => vamp.id === this.props.vampId);
      this.setState({
        grid: vamp.notation,
        tempo: vamp.tempo,
        volume: vamp.volume,
      });
    }
  }

  componentWillUnmount() {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    this.state.synths.forEach((synth) => synth.dispose());
    this.props.clearErrors();
  }

  playMusic = () => {
    const repeat = (time) => {
      let beat = this.state.beat;

      this.state.grid.forEach((row, index) => {
        let synth = this.state.synths[index];
        let note = row[beat];
        if (note.isActive) {
          synth.triggerAttackRelease(note.note, "8n", time);
        }
      });

      this.setState({ beat: (this.state.beat + 1) % 16 });
    };

    Tone.Transport.bpm.value = this.state.tempo;
    Tone.Transport.scheduleRepeat(repeat, "8n");
    Tone.Transport.start();
  };

  handleOnClick = (clickedRowIndex, clickedNoteIndex) => {
    let newRows = this.state.grid.map((row, rowIndex) => {
      return row.map((note, noteIndex) => {
        let newNote = note;
        if (clickedRowIndex === rowIndex && clickedNoteIndex === noteIndex) {
          newNote.isActive = !note.isActive;
        }
        return newNote;
      });
    });

    this.setState({ rows: newRows });
  };

  togglePlay = () => {
    if (!this.state.activated) {
      Tone.start();
      this.setState({ activated: true, playing: true });
      Tone.getDestination().volume.rampTo(this.state.volume, 0.001);
      this.playMusic();  
      return;
    }

    if (!this.state.playing) {
      Tone.Transport.start();
      this.setState({ playing: true });
    } else {
      Tone.Transport.stop();
      this.setState({ playing: false });
    }
  };

  handleTempoChange = (e) => {
    this.setState({ tempo: e.target.value });
    Tone.Transport.bpm.rampTo(e.target.value - 10, 0.1);
  };

  handleVolumeChange = (e) => {
    this.setState({ volume: parseFloat(e.target.value) });
    Tone.getDestination().volume.rampTo(parseFloat(e.target.value), 0.001);
  };

  constructAudioConfigObj = (blob) => {
    console.log("constructing configObj!");
    const formData = new FormData();
    formData.append("recording", blob);

    const configObj = {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    };

    return configObj;
  };

  saveRecording = (blob) => {
    const configObj = this.constructAudioConfigObj(blob);

    console.log("about to fetch");
    fetch("http://localhost:3001/noodles", configObj)
      .then((resp) => resp.json())
      .then((json) => console.log(json));
    console.log("fetch completed");
  };

  constructVampConfigObj = () => {
    const formData = new FormData();
    const grid = JSON.stringify(this.state.grid);
    formData.append("notation", grid);
    debugger;
    const configObj = {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    };

    return configObj;
  };

  displayModal = () => {
    this.setState({ modalDisplayed: true });
  };

  hideModal = () => {
    this.props.clearErrors();
    this.setState({ modalDisplayed: false });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.clearErrors();
    if (this.props.vampId) {
      this.props.editVamp({
        id: this.props.vampId,
        name: this.state.name,
        notation: this.state.grid,
        volume: this.state.volume,
        tempo: this.state.tempo,
      });
    } else {
      this.props.saveVamp({
        name: this.state.name,
        notation: this.state.grid,
        volume: this.state.volume,
        tempo: this.state.tempo,
      });
    }
  };

  handleOnChange = (e) => {
    this.setState({ name: e.target.value });
  };

  renderModal = () => {
    if (!!this.state.modalDisplayed) {
      if (!!this.props.vampId) {
        let vamp = this.props.vamps.find(
          (vamp) => vamp.id === this.props.vampId
        );
        return (
          <SaveVampModal
            status={this.props.status}
            vamp={vamp}
            error={this.props.error}
            pending={this.props.pending}
            handleOnSubmit={this.handleOnSubmit}
            handleOnChange={this.handleOnChange}
            hideModal={this.hideModal}
          />
        );
      } else {
        return (
          <SaveVampModal
            status={this.props.status}
            error={this.props.error}
            pending={this.props.pending}
            handleOnSubmit={this.handleOnSubmit}
            handleOnChange={this.handleOnChange}
            hideModal={this.hideModal}
          />
        );
      }
    }
  };

  encodeGrid = (grid) => {
    // encode grid using LZW compression algorithm into a compressed, URI safe string.

    const notation = grid.map((row) => {
      return row.map((note) => note.isActive);
    });

    const vamp = {
      notation: notation,
      tempo: this.state.tempo,
      volume: this.state.volume,
      name: this.state.name,
    };

    return LZString.compressToEncodedURIComponent(JSON.stringify(vamp));
  };

  decodeQueryString = (string) => {
    return JSON.parse(LZString.decompressFromEncodedURIComponent(string));
  };

  loadQueryData = (string) => {
    const decoded = this.decodeQueryString(string);
    if (!decoded) {
      window.location.href = "/";
    } else {
      const decodedGrid = this.state.grid.map((row, rowIndex) => {
        return row.map((note, noteIndex) => {
          let newNote = Object.assign({}, note);
          newNote.isActive = decoded.notation[rowIndex][noteIndex];
          return newNote;
        });
      });

      this.setState({
        name: decoded.name,
        tempo: decoded.tempo,
        volume: decoded.volume,
        grid: decodedGrid,
      });
    }
  };

  render() {
    return (
      <div className="tones">
        {this.renderModal()}
        {/* Sequencer Buttons */}
        <DisplayGrid
          grid={this.state.grid}
          beat={this.state.beat}
          handleOnClick={this.handleOnClick}
        />

        <PlayButton playing={this.state.playing} togglePlay={this.togglePlay} />

        <TempoDisplay
          tempo={this.state.tempo}
          handleTempoChange={this.handleTempoChange}
        />

        <VolumeDisplay
          volume={this.state.volume}
          handleVolumeChange={this.handleVolumeChange}
        />

        <button
          className="button is-rounded is-primary"
          onClick={this.displayModal}
        >
          {!!this.props.vampId ? "Save Changes" : "Save Vamp"}
        </button>
        <ShareModal encodeGrid={() => this.encodeGrid(this.state.grid)} />
        {/* <Recorder saveRecording={this.saveRecording} recorder={this.makeRecorder()} /> */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getVamp: (vampId) => dispatch(getVamp(vampId)),
  clearErrors: () => dispatch({ type: "CLEAR_ERRORS" }),
  saveVamp: (vamp) => dispatch(saveVamp(vamp)),
  editVamp: (vamp) => dispatch(editVamp(vamp)),
});

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  pending: state.vamp.pending,
  error: state.vamp.error,
  vamps: state.vamp.vamps,
  status: state.vamp.status,
});

export default connect(mapStateToProps, mapDispatchToProps)(NoiseMaker);
