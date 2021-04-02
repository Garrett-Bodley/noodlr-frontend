import './App.css';
import { Component } from 'react'
import NoisemakerContainer from './containers/NoisemakerContainer'
import UsersContainer from './containers/UsersContainer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { connect } from 'react-redux';
import { getUser } from './actions/authActions'

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
        <Route exact path={['/login', '/signup']} render={() => <UsersContainer getUser={this.props.getUser} /> } />
        <Route exact path={['/noodlr', '/']} render={() => <NoisemakerContainer getUser={this.props.getUser} /> }/>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser())
})

export default connect(null, mapDispatchToProps)(App);
