import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import { createNewUser } from '../actions/currentUserActions'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class UsersContainer extends Component {

  handleFormSubmit = () => {
    
  }


  render(){
    return(
      <div className="container" id="users">
        <Switch>
          <Route path='/signup' render={() => <SignUp createNewUser={this.props.createNewUser}/>} />
          <Route path='/login' render={() => <Login/> } />
        </Switch>
        {/* <Login /> */}
        {/* <SignUp createNewUser={this.props.createNewUser}/> */}
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => ({
  createNewUser: userInfo => dispatch(createNewUser(userInfo))
})

export default connect(null, mapDispatchToProps)(UsersContainer)