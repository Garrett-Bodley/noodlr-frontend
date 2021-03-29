import logo from './logo.svg';
import './App.css';
import NoisemakerContainer from './containers/NoisemakerContainer'
import UsersContainer from './containers/UsersContainer'

function App() {
  // console.log(SUBMIT_URL)
  return (
    <div className="App">
      {/* <NoisemakerContainer /> */}
      <UsersContainer />
    </div>
  );
}

export default App;
