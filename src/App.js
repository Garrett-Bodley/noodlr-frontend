import './App.css';
import { Component } from 'react'
import AuthContainer from './containers/AuthContainer'
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { connect } from 'react-redux';
import { getUser } from './actions/authActions'
import UserContainer from './containers/UserContainer';
import NoodlrContainer from './containers/AdLibrContainer';
import JamrContainer from './containers/JamrContainer';

class App extends Component{

  componentDidMount(){
    this.props.getUser()
  }

  componentDidUpdate(){
    this.props.getUser()
  }

  render(){
    return (
      <Router >
        <Navbar />
        <Switch>
          <Route exact path={['/login', '/signup']} render={() => <AuthContainer/> } />
          <Route exact path={['/jamr', '/']} component={ JamrContainer }/>
          <Route exact path ="/adlibr" render={() => <NoodlrContainer />} />
          <Route path='/vamps/:id' render={(routeProps) => <JamrContainer {...routeProps} />} />
          <Route path='/users' render={(routeProps) => <UserContainer {...routeProps} /> } />
        </Switch>
        <br/>
        <br/>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser())
})

export default connect(null, mapDispatchToProps)(App);
