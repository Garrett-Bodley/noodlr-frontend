import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import { createNewUser, loginUser, clearStatus } from '../actions/authActions'
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

class AuthContainer extends Component {

  componentDidMount(){

  }

  componentWillUnmount(){

  }

  render(){
    return(
      <div className="container" id="users">
        <Switch>
          {this.props.loggedIn ? <Redirect to={`/users/${this.props.currentUser.id}`} /> : null}
          <Route path='/signup' render={() => <SignUp clearStatus={this.props.clearStatus} status={this.props.status} createNewUser={this.props.createNewUser}/>} />
          <Route path='/login' render={() => <Login clearStatus={this.props.clearStatus} status={this.props.status} loginUser={this.props.loginUser} /> } />
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  createNewUser: userInfo => dispatch(createNewUser(userInfo)),
  loginUser: userInfo => dispatch(loginUser(userInfo)),
  clearStatus: () => dispatch(clearStatus())
})

const mapStateToProps = (state) => ({
  state: state,
  loggedIn: state.auth.loggedIn,
  currentUser: state.auth.currentUser,
  status: state.auth.status
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)