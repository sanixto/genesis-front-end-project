import './App.css';
import { TokenProvider } from './TokenContext';

function App() {
  return (
    <TokenProvider>
      <div>App</div>
    </TokenProvider>
  );
}

export default App;
