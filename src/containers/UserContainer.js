import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Profile from '../components/Profile'
import EditUser from '../components/EditUser'
import { getUserVamps, deleteVamp, resetVampStatus } from '../actions/vampActions'
import { getUser, patchUser, clearStatus, deleteUser } from '../actions/authActions'
import './User.css'

class UserContainer extends Component{

  async componentDidMount(){
    await this.props.getUser()
    if(!this.props.loggedIn){
      this.props.history.push('/login')
    }
  }

  componentDidUpdate(){
    if(!this.props.loggedIn){
      this.props.history.push('/login')
    }
  }

  componentWillUnmount(){
    this.props.resetVampStatus()
  }

  render(){
    return(
      <div id="user-container">
        <Switch>
          <Route 
          exact path={`/users/${this.props.currentUser.id}`} 
          render={() => 
            <Profile 
            history={this.props.history} 
            currentUser={this.props.currentUser} 
            vamps={this.props.vamps} 
            getUserVamps={this.props.getUserVamps}
            deleteVamp={this.props.deleteVamp}
            vampStatus={this.props.vampStatus}
            vampError={this.props.vampError}
            />}
          />
          <Route exact path={`/users/${this.props.currentUser.id}/edit`}
            render={() => 
              <EditUser 
              clearStatus={this.props.clearStatus}
              status={this.props.status}
              patchUser={this.props.patchUser} 
              currentUser={this.props.currentUser}
              deleteUser={this.props.deleteUser}
              />
            }
          />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  vampStatus: state.vamp.status,
  vampError: state.vamp.error,
  vamps: state.vamp.vamps,
  currentUser: state.auth.currentUser,
  loggedIn: state.auth.loggedIn,
  status: state.auth.status
})

const mapDispatchToProps = (dispatch) => ({
  getUserVamps: () => dispatch(getUserVamps()),
  deleteVamp: (vampId) => dispatch(deleteVamp(vampId)),
  getUser: () => dispatch(getUser()),
  patchUser: (user) => dispatch(patchUser(user)),
  clearStatus: () => dispatch(clearStatus()),
  deleteUser: (user) => dispatch(deleteUser(user)),
  resetVampStatus: () => dispatch(resetVampStatus())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)