import { Component } from 'react'
import { Link } from 'react-router-dom'
import { DisplayVamps } from './DisplayVamps'
import { ProfileErrors } from './ProfileErrors'

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
              <ProfileErrors vampError={this.props.vampError} vampStatus={this.props.vampStatus} />
              <DisplayVamps 
              vamps={this.props.vamps} 
              selectedVamp={this.state.selectedVamp} 
              handleOnChange={this.handleOnChange}
              handleVampLoad={this.handleVampLoad} 
              handleDelete={this.handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile