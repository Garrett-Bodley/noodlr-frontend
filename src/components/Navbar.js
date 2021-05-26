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
            <Link className="subtitle" to='/noodlr'>Noodlr</Link>
          </div>
          <div className="navbar-item is-hoverable">
            <Link className="subtitle" to='/jamr'>Jamr</Link>
          </div>
          <div className="navbar-item is-hoverable">
            <Link className="subtitle" to={`/users/${this.props.currentUser.id}`}>Profile</Link>
          </div>
          <div className="navbar-item is-hoverable">
            <Link className="subtitle" to="/login" onClick={this.props.logoutUser}>Log Out</Link>
          </div>
        </div>
      )
    }else{
      return(
        <div className="navbar-end">
          <div className="navbar-item is-hoverable">
            <Link className="subtitle" to='/noodlr'>Noodlr</Link>
          </div>
          <div className="navbar-item is-hoverable">
            <Link className="subtitle" to='/jamr'>Jamr</Link>
          </div>
          <div className="navbar-item is-hoverable">
            <Link className="subtitle" to="/login">Login</Link>
          </div>
          <div className="navbar-item is-hoverable">
            <Link className="subtitle" to="/signup" >Sign Up</Link>
          </div>
        </div>
      )
    } 
  }


  render(){
    return(
      <nav className="navbar is-spaced" id="navbar">
        <div className="navbar-brand" >
          <Link className="title is-1" to='/noodlr'>  Noodlr</Link>
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