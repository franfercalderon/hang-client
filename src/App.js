import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './views/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Feed from './views/Feed';
import Welcome from './views/Welcome';

function App() {
  return (  
    <>
      <BrowserRouter>
        <Routes>
            <Route exact path='/welcome' element={ <Welcome/> }/>
            <Route exact path='/login' element={ <Login/> }/>
            <Route exact path='/signup' element={ <Welcome/> }/>
            <Route exact path='/'element={
                <ProtectedRoute >
                  <Feed/>
                </ProtectedRoute>
              } 
            />
            
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
