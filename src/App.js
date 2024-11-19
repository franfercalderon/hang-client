import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './views/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Feed from './views/Feed';
import Welcome from './views/Welcome';
import { AppProvider } from './context/AppContext';
import Onboarding from './views/Onboarding';

function App() {
  return (  
    <>
      <BrowserRouter>
        <AppProvider>
          <Routes>
              <Route exact path='/welcome' element={ <Welcome/> }/>
              <Route exact path='/login' element={ <Login/> }/>
              <Route exact path='/onboarding' element={ <Onboarding/> }/>
              {/* <Route exact path='/' element={ <Feed/> }/> */}
              <Route exact path='/'element={
                  <ProtectedRoute >
                    <Feed/>
                  </ProtectedRoute>
                } 
              />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
