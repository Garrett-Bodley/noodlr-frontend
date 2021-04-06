import React, { Component } from 'react'

class Profile extends Component{

  state = {
    selectedVamp: ''
  }

  componentDidMount(){
    this.props.getUserVamps()
  }

  displayVamps = () => {
    return this.props.vamps.map(vamp => <option key={vamp.id} value={vamp.id} >{vamp.name}</option>)
  }

  handleVampLoad = (e) => {
    e.preventDefault();
    this.props.history.push(`/vamps/${this.state.selectedVamp}`)
  }

  handleOnChange = (e) => {
    this.setState({selectedVamp: e.target.value})
  }

  render(){
    return(

      <div id="profile" className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent is-4">
            <div className="tile is-child box">
              <div className="field">
                <p className="title">{this.props.currentUser.username}</p>
              </div>
            </div>
          </div>
          <div className="tile is-parent is-8">
            <div className="tile is-child box">
              <p className="title">Vamps:</p>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <div className="select is-fullwidth">
                    <select value={this.state.selectedVamp} onChange={this.handleOnChange}>
                      {this.displayVamps()}
                    </select>
                  </div>
                </div>
                <button onClick={this.handleVampLoad} className="button mx-1 is-grouped is-link">Load</button>
                <button className="button is-grouped is-danger">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile