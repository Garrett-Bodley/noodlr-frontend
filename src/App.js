import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux'
import NoisemakerContainer from './containers/NoisemakerContainer'

function App() {
  return (
    <div className="App">
      <NoisemakerContainer />
    </div>
  );
}

export default App;
