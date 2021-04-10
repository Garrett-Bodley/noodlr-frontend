import React, { Component } from 'react'

class Signup extends Component{
  
  state = {
    username: '',
    password: '',
    passwordConfirmation: ''
  }

  componentDidMount(){
    this.props.clearStatus()
  }

  componentWillUnmount(){
    this.props.clearStatus()
  }

  handleOnChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.createNewUser({
      username: this.state.username,
      password: this.state.password,
      password_confirmation: this.state.passwordConfirmation
    })
  }

  render(){
    return(
      <div id="SignUp" className="container card box login">
        <form onSubmit={this.handleOnSubmit} >
          <div className="field">
            <h2 className="is-size-2">Sign Up</h2>
          </div>
          <div className="field">
            <p className="has-text-danger has-background-danger-light">{!!this.props.status.failed ? `${this.props.status.messages}` : null}</p>
          </div>
          <div className="field">
            <label>Username:</label>
            <div className="control">
              <input name="username" className="input" onChange={this.handleOnChange} value={this.state.username} type="text"></input>
            </div>
          </div>
          <div className="field">
            <label>Password:</label>
            <div className="control">
              <input name="password" className="input" onChange={this.handleOnChange} value={this.state.password} type="password"></input>
            </div>
          </div>
          <div className="field">
            <label>Password Confirmation:</label>
            <div className="control">
              <input name="passwordConfirmation" className="input" onChange={this.handleOnChange} value={this.state.passwordConfirmation} type="password"></input>
            </div>
          </div>
          <div className="field">
            <button className="button is-link" type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Signup