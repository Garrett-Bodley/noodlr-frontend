import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Profile from '../components/Profile'
import { getUserVamps } from '../actions/vampActions'
import './User.css'

class UserContainer extends Component{

  componentDidUpdate(){
    if(!this.props.loggedIn){
      this.props.history.push('/login')
    }
  }

  render(){
    return(
      <div id="user-container">
        <Route 
          exact path={`/users/${this.props.currentUser.id}`} 
          render={() => <Profile history={this.props.history} currentUser={this.props.currentUser} vamps={this.props.vamps} getUserVamps={this.props.getUserVamps} />} 
        />
        <Route exact path={`/users/${this.props.currentUser.id}/edit`} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  vamps: state.vamp.vamps,
  currentUser: state.auth.currentUser,
  loggedIn: state.auth.loggedIn
})

const mapDispatchToProps = (dispatch) => ({
  getUserVamps: () => dispatch(getUserVamps())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)