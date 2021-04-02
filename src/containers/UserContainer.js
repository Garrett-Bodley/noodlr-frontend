import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import Profile from '../components/Profile'
import { getUserVamps } from '../actions/vampActions'
import './User.css'

class UserContainer extends Component{

  render(){
    return(
      <div id="user-container">
        <Route 
          exact path={`/users/${this.props.currentUser.id}`} 
          render={() => <Profile getUserVamps={this.props.getUserVamps} />} 
        />
        <Route exact path={`/users/${this.props.currentUser.id}/edit`} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  getUserVamps: () => dispatch(getUserVamps())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)