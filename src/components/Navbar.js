import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component{


  render(){
    return(
      <nav className="navbar" id="navbar">
        <div className="navbar-brand" >
          <p className="title is-1">Noodlr</p>
        </div>
        <div className="navbar-end">
          <div className="navbar-item is-hoverable">
            <Link to="/login">Login</Link>
          </div>
          <div className="navbar-item is-hoverable">
            <Link to="/signup" >Sign Up</Link>
          </div>
        </div>
      </nav>
    )
  }

}

export default Navbar