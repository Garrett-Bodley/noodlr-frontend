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

class UsersContainer extends Component {

  handleFormSubmit = () => {
    
  }

  componentDidMount(){
    this.props.getUser()
    console.log('State: ')
    console.log(this.props.getUser)
  }

  componentDidUpdate(){
    this.props.getUser()
    console.log('State: ')
    console.log(this.props.state)
  }

  render(){
    return(
      <div className="container" id="users">
        <Switch>
          {this.props.loggedIn ? <Redirect to='/noodlr' /> : null}
          <Route path='/signup' render={() => <SignUp createNewUser={this.props.createNewUser}/>} />
          <Route path='/login' render={() => <Login loginPostFetch={this.props.loginPostFetch} /> } />
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
  loggedIn: state.authReducer.loggedIn,
  current_user: state.authReducer.current_user
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)