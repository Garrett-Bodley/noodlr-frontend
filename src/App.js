import './App.css';
import { Component } from 'react'
import NoisemakerContainer from './containers/NoisemakerContainer'
import AuthContainer from './containers/AuthContainer'
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { connect } from 'react-redux';
import { getUser } from './actions/authActions'
import UserContainer from './containers/UserContainer';

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
        <br/>
        <Route exact path={['/login', '/signup']} render={() => <AuthContainer getUser={this.props.getUser} /> } />
        <Route exact path={['/noodlr', '/']} render={() => <NoisemakerContainer getUser={this.props.getUser} /> }/>
        <Route path='/users' render={() => <UserContainer getUser={this.props.getUser} /> } />
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
