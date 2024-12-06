import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './views/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Feed from './views/Feed';
import Welcome from './views/Welcome';
import { AppProvider } from './context/AppContext';
import Onboarding from './views/Onboarding';
import Invite from './views/Invite';
import Master from './views/Master';
import Notifactions from './views/Notifications';
import Assistant from './views/Assistant';
import Settings from './views/Settings';
import Create from './views/Create';

function App() {
  return (  
    <>
      <BrowserRouter>
        <AppProvider>
          <Routes>
              <Route exact path='/welcome' element={ <Welcome/> }/>
              <Route exact path='/login' element={ <Login/> }/>
              <Route exact path='/master' element={ <Master/> }/>
              <Route exact path='/onboarding' element={ <Onboarding/> }/>
              <Route exact path='/invite/:id' element={ <Invite/> } />

              <Route exact path='/'element={
                <ProtectedRoute >
                  <Feed/>
                </ProtectedRoute>
              }/>
              {/* <Route exact path='/' element={ <Feed/> } /> */}
              {/* <Route exact path='/notifications' element={ <Notifactions/>} />
              <Route exact path='/assistant' element={ <Assistant/>} />
              <Route exact path='/settings' element={ <Settings/>} />
              <Route exact path='/create' element={ <Create/>} /> */}
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
