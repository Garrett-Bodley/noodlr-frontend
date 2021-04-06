import React, { Component } from 'react'

class Login extends Component {
  
  state = {
    username: null,
    password: null
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
  
      <div id="login" className="container card box">
        <form onSubmit={this.handleOnSubmit} onChange={this.handleOnChange} >
          <div className="field">
            <h2 className="is-size-2">Login</h2>
          </div>
          <div className="field">
            <label>Username:</label>
            <div className="control">
              <input className="input" name="username" type="text"></input>
            </div>
          </div>
          <div className="field">
            <label>Password:</label>
            <div className="control">
              <input className="input" name="password" type="password"></input>
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