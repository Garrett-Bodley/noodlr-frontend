import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import { createNewUser, loginUser } from '../actions/authActions'
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

class AuthContainer extends Component {

  render(){
    return(
      <div className="container" id="users">
        <Switch>
          {this.props.loggedIn ? <Redirect to='/noodlr' /> : null}
          <Route path='/signup' render={() => <SignUp createNewUser={this.props.createNewUser}/>} />
          <Route path='/login' render={() => <Login loginUser={this.props.loginUser} /> } />
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  createNewUser: userInfo => dispatch(createNewUser(userInfo)),
  loginUser: userInfo => dispatch(loginUser(userInfo))
})

const mapStateToProps = (state) => ({
  state: state,
  loggedIn: state.auth.loggedIn,
  current_user: state.auth.current_user
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)