import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { TokenProvider } from './TokenContext';
import { PageProvider } from './PageContext';
import Catalog from './Components/Catalog';

function App() {
  return (
    <TokenProvider>
      <PageProvider>
        <Catalog />
      </PageProvider>
    </TokenProvider>
  );
}

export default App;
