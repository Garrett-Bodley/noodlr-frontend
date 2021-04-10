import { Component } from 'react'
import { Link } from 'react-router-dom'

class Profile extends Component{

  state = {
    selectedVamp: undefined
  }

  componentDidMount(){
    this.props.getUserVamps()
  }

  componentDidUpdate(){
    if (this.props.vamps.length > 0 && this.state.selectedVamp === undefined) {
      this.setState({selectedVamp: this.props.vamps[0].id})
    }
  }

  displayVamps = () => {
    return this.props.vamps.map(vamp => <option key={vamp.id} value={vamp.id} >{vamp.name}</option>)
  }

  handleVampLoad = () => {
    if(this.props.vamps.length > 0){
      this.props.history.push(`/vamps/${this.state.selectedVamp}`)
    }else{
      this.props.history.push('/noodlr')
    }
  }

  handleOnChange = (e) => {
    this.setState({selectedVamp: e.target.value})
  }

  handleDelete = async () => {
    if(this.props.vamps.length > 0){
      await this.props.deleteVamp(this.state.selectedVamp)
      this.props.getUserVamps()
    }
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
              <div className="field">
                <Link to={`/users/${this.props.currentUser.id}/edit`}> Edit User</Link>
              </div>
            </div>
          </div>
          <div className="tile is-parent is-8">
            <div className="tile is-child box">
              <p className="title">Vamps:</p>
              <div className="field">
                <p className="has-text-danger has-background-danger-light">{this.props.vampError ? this.props.vampError : null}</p>
                <p className="has-text-success has-background-success-light">{this.props.vampStatus ? this.props.vampStatus : null}</p>
              </div>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <div className="select is-fullwidth">
                    <select value={this.state.selectedVamp} onChange={this.handleOnChange}>
                      {this.displayVamps()}
                    </select>
                  </div>
                </div>
                {(this.props.vamps.length > 0) ?
                  <>
                    <button onClick={this.handleVampLoad} className="button mx-1 is-grouped is-link">Load</button>
                    <button onClick={this.handleDelete} className="button is-grouped is-danger">Delete</button>
                  </>
                : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile