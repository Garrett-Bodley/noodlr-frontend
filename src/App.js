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
        <Route exact path={['/login', '/signup']} render={() => <AuthContainer/> } />
        <Route exact path={['/noodlr', '/']} render={() => <NoisemakerContainer/> }/>
        <Route path='/users' render={() => <UserContainer/> } />
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
