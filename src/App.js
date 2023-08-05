import { Router, Routes } from 'react-router-dom';
import './App.css';
import CenteredFormComponent from './components/form';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes exact path='/' >
        <CenteredFormComponent />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
