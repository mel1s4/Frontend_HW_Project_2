import logo from './logo.svg';
import './App.scss';
import { AtmState } from './Context';
import Atm from './Atm';
import { GlobalContextProvider } from './Context';

function App() {
  return (    
    <div className="App">
      <GlobalContextProvider>
        <Atm />
      </GlobalContextProvider>
    </div>
  );
}

export default App;
