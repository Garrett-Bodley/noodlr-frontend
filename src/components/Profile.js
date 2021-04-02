import React, { Component } from 'react'

class Profile extends Component{

  componentDidMount(){
    this.props.getUserVamps()
  }

  render(){
    return(
      <div id="profile">

      </div>
    )
  }
}

export default Profile