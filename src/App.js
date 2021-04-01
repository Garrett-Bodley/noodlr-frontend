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

class App extends Component{

  componentDidMount(){

  }

  componentDidUpdate(){

  }

  render(){
    return (
      <Router >
        <Route exact path={['/login', '/signup']} component={UsersContainer} />
        <Route exact path={['/noodlr', '/']} component={NoisemakerContainer} />
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  Auth: 
})

export default App;
