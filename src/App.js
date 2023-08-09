import { Route, Routes } from 'react-router-dom';
import './App.css';
import CenteredFormComponent from './components/form';
import Home from './components/home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/form' element={ <CenteredFormComponent />} />
       
      </Routes>
  
    </div>
  );
}

export default App;
