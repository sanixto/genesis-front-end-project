import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { TokenProvider } from './TokenContext';
import { PageProvider } from './PageContext';
import Catalog from './Components/Catalog';
import Pagination from './Components/Pagination';

function App() {
  return (
    <TokenProvider>
      <PageProvider>
        <Catalog />
        <Pagination />
      </PageProvider>
    </TokenProvider>
  );
}

export default App;
