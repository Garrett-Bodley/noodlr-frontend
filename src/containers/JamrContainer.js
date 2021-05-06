import React, { Component } from 'react'
import { connect } from 'react-redux'

class JamrContainer extends Component{

  // makeKeys = () => {
  //   const keys = []
  //   for(let i = 0; i < 8; i++){
  //     let key = <div id={`key-${i}`}></div>
  //   }

  // }


  render(){
    return(
      <div id="jammr-container">





      </div>
    )
  }

}

export default connect()(JamrContainer)