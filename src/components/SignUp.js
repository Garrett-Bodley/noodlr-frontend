import React, { Component } from 'react'

class Signup extends Component{
  
  state = {
    username: null,
    password: null
  }

  handleOnChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.createNewUser(this.state)
  }

  render(){
    return(
      <form onSubmit={this.handleOnSubmit} onChange={this.handleOnChange} >
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
        <div className="field">
          <p>{this.state.username}</p>
          <p>{this.state.password}</p>
        </div>
      </form>
    )
  }
}

export default Signup