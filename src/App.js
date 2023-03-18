import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Catalog from './Components/Catalog';
import { TokenProvider } from './TokenContext';

function App() {
  return (
    <TokenProvider>
      <Container>
        <Catalog />
      </Container>
    </TokenProvider>
  );
}

export default App;
