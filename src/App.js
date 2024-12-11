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
import CreateHang from './views/CreateHang';
import CreateNow from './views/CreateNow';
import SettingsCalendar from './views/SettingsCalendar';
import SettingsCalendarNew from './views/SettingsCalendarNew';

function App() {
  return (  
    <>
      <BrowserRouter>
        <AppProvider>
          <ProtectedRoute>
            <Routes>
              <Route exact path='/' element={ <Feed/> } />
              <Route exact path='/settings' element={ <Settings/>}/>
              <Route exact path='/settings/calendar' element={ <SettingsCalendar/>} />
            </Routes>
          </ProtectedRoute>
          <Routes>
              <Route exact path='/welcome' element={ <Welcome/> }/>
              <Route exact path='/login' element={ <Login/> }/>
              <Route exact path='/master' element={ <Master/> }/>
              <Route exact path='/onboarding' element={ <Onboarding/> }/>
              <Route exact path='/invite/:id' element={ <Invite/> } />
              
              {/* <Route exact path='/'element={
                <ProtectedRoute >
                  <Feed/>
                </ProtectedRoute>
              }/> */}
              {/* <Route exact path='/settings'element={
                <ProtectedRoute >
                  <Settings/>
                </ProtectedRoute>
              }/>
              <Route exact path='/settings/calendar'element={
                <ProtectedRoute >
                  <SettingsCalendar/>
                </ProtectedRoute>
              }/> */}

              {/* <Route element={<ProtectedRoute />}>
                <Route exact path='/' element={ <Feed/> } />
                <Route path="/settings" element={<Settings />}>
                  <Route path="calendar" element={<SettingsCalendar />} />
                </Route>
              </Route> */}

              {/* <Route exact path='/' element={ <Feed/> } />
              <Route exact path='/settings' element={ <Settings/>} />
              <Route exact path='/settings/calendar' element={ <SettingsCalendar/>} /> */}
              <Route exact path='/settings/calendar/new' element={ <SettingsCalendarNew/>} />
              <Route exact path='/notifications' element={ <Notifactions/>} />
              <Route exact path='/assistant' element={ <Assistant/>} />
              <Route exact path='/create' element={ <Create/>} />
              <Route exact path='/create/hang' element={ <CreateHang/>} />
              <Route exact path='/create/now' element={ <CreateNow/>} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
