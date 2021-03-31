import logo from './logo.svg';
import './App.css';
import NoisemakerContainer from './containers/NoisemakerContainer'
import UsersContainer from './containers/UsersContainer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  // console.log(SUBMIT_URL)
  return (
    <Router >
      <Route exact path={['/login', '/signup']} component={UsersContainer} />
      <Route exact path={['/noodlr', '/']} component={NoisemakerContainer} />
    </Router>
  );
}

export default App;
