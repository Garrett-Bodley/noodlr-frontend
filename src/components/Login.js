import React, { Component } from 'react'

class Login extends Component {
  
  state = {
    username: null,
    password: null
  }

  handleOnChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    return(
  
      <div id="login" className="container card box">
        <h2 className="is-size-2">Login</h2>
        <form onChange={this.handleOnChange} >
          <div className="field">
            <label>Username:</label>
            <div className="control">
              <input name="username" type="text"></input>
            </div>
          </div>
          <div className="field">
            <label>Password:</label>
            <div className="control">
              <input name="password" type="password"></input>
            </div>
          </div>
          <div className="field">
            <button type="submit">Submit</button>
          </div>
        </form>
        <p>{this.state.username}</p>
        <p>{this.state.password}</p>
      </div>
    )
  }
}

export default Login