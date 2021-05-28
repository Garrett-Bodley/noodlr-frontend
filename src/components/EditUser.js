import React, { Component } from 'react'
import DeleteUserModal from './DeleteUserModal'

class EditUser extends Component{
  
  state = {
    username: this.props.currentUser.username,
    oldPassword: '',
    newPassword: '',
    passwordConfirmation: '',
    modalDisplayed: false
  }

  componentDidMount(){
    this.props.clearStatus()
  }

  componentWillUnmount(){
    this.props.clearStatus()
  }

  renderModal = () => {
    if(!!this.state.modalDisplayed){
      return (
        <DeleteUserModal 
          deleteUser={() => this.props.deleteUser(this.props.currentUser.id)} 
          hideModal={this.hideModal}
        />
      )
    }
  }

  displayModal = (e) => {
    e.preventDefault()
    this.setState({modalDisplayed: true})
  }

  hideModal = () => {
    this.setState({modalDisplayed: false})
    this.props.clearStatus()
  }

  handleOnChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    this.props.patchUser({
      id: this.props.currentUser.id,
      username: this.state.username,
      password: this.state.oldPassword,
      new_password: this.state.newPassword,
      new_password_confirmation: this.state.passwordConfirmation
    })
    this.setState({    
      oldPassword: '',
      newPassword: '',
      passwordConfirmation: ''
    })
  }

  render(){
    return(
      <div id="editUser" className="container card box login">
        {this.renderModal()}
        <form onSubmit={this.handleOnSubmit} >
          <div className="field">
            <h2 className="is-size-2">Edit Account:</h2>
          </div>
          <div className="field">
            <p className="has-text-danger has-background-danger-light">{!!this.props.status.failed ? `${this.props.status.messages}` : null}</p>
            <p className="has-text-success has-background-success-light">{!!this.props.status.success ? `${this.props.status.messages}` : null}</p>
          </div>
          <div className="field">
            <label>Username:</label>
            <div className="control">
              <input name="username" className="input" onChange={this.handleOnChange} value={this.state.username} type="text"></input>
            </div>
          </div>
          <div className="field">
            <label>Current Password:</label>
            <div className="control">
              <input name="oldPassword" className="input" onChange={this.handleOnChange} value={this.state.password} type="password"></input>
            </div>
          </div>
          <div className="field">
            <label>New Password:</label>
            <div className="control">
              <input name="newPassword" className="input" onChange={this.handleOnChange} value={this.state.password} type="password"></input>
            </div>
          </div>
          <div className="field">
            <label>New Password Confirmation:</label>
            <div className="control">
              <input name="passwordConfirmation" className="input" onChange={this.handleOnChange} value={this.state.passwordConfirmation} type="password"></input>
            </div>
          </div>
          <div className="field">
            <button className="button is-link" type="submit">Save Changes</button>
          </div>
          <div className="field">
            <button className="button is-danger" onClick={this.displayModal}>Delete Account</button>
          </div>
        </form>
      </div>
    )
  }
}

export default EditUser