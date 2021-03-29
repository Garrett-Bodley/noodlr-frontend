import React, { Component } from 'react'
import Login from '../components/Login'

class UsersContainer extends Component {

  render(){
    return(
      <div className="container" id="users">
        <Login />
      </div>
    )
  }

}

export default UsersContainer