import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './views/Login';

function App() {
  return (  
    <>
      <BrowserRouter>
        <Routes>
            <Route exact path='/test' element={ <Login/> }/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
