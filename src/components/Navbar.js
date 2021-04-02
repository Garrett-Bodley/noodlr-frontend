import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/authActions'

class Navbar extends Component{

  renderLinks = () => {
    if(this.props.loggedIn){
      return (
        <div className="navbar-end">
          <div className="navbar-item is-hoverable">
            <Link to={`/users/${this.props.currentUser.id}`}>Profile</Link>
          </div>
          <div className="navbar-item is-hoverable">
            <Link to="/login" onClick={this.props.logoutUser}>Log Out</Link>
          </div>
        </div>
      )
    }else{
      return(
        <div className="navbar-end">
          <div className="navbar-item is-hoverable">
            <Link to="/login">Login</Link>
          </div>
          <div className="navbar-item is-hoverable">
            <Link to="/signup" >Sign Up</Link>
          </div>
        </div>
      )
    } 
  }


  render(){
    return(
      <nav className="navbar is-spaced" id="navbar">
        <div className="navbar-brand" >
          <p className="title is-1">  Noodlr</p>
        </div>
        {this.renderLinks()}
      </nav>
    )
  }

}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
  currentUser: state.auth.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)