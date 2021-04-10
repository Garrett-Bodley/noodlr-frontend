import React, { Component } from 'react'

class Login extends Component {
  
  state = {
    username: '',
    password: ''
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
    e.target.reset();
    this.props.loginUser(this.state)
  }

  render(){
    return(
  
      <div id="login" className="container card box login">
        <form onSubmit={this.handleOnSubmit} onChange={this.handleOnChange} >
          <div className="field">
            <h2 className="is-size-2">Login</h2>
          </div>
          <div className="field">
            <p className="has-text-danger has-background-danger-light">{!!this.props.status.failed ? `${this.props.status.messages}` : null}</p>
          </div>
          <div className="field">
            <label>Username:</label>
            <div className="control">
              <input className="input" name="username" onChange={this.handleOnChange} value={this.state.username} type="text"></input>
            </div>
          </div>
          <div className="field">
            <label>Password:</label>
            <div className="control">
              <input className="input" name="password" onChange={this.handleOnChange} value={this.state.password} type="password"></input>
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

export default Login