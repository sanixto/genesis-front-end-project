import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { TokenProvider } from './TokenContext';
import CoursesPage from './Components/CoursesPage/CoursesPage';

function App() {
  return (
    <TokenProvider>
      <Routes>
        <Route path="/" element={<CoursesPage />} />
      </Routes>
    </TokenProvider>
  );
}

export default App;
