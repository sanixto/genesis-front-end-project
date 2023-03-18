import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { TokenProvider } from './TokenContext';
import CoursesPage from './Components/CoursesPage/CoursesPage';

function App() {
  return (
    <TokenProvider>
      <CoursesPage />
    </TokenProvider>
  );
}

export default App;
