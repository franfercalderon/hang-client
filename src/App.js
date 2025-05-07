import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
// import SettingsCalendar from './views/SettingsCalendar';
import SettingsCalendarNew from './views/SettingsCalendarNew';
import SettingsFriends from './views/SettingsFriends';
import SettingsNotifications from './views/SettingsNotifications';
import SettingsAdmin from './views/SettingsAdmin';
import SettingsFriendsManage from './views/SettingsFriendsManage';
import SettingsFriendsExplore from './views/SettingsFriendsExplore';
import { SlotsProvider } from './context/SlotsContext';
import LoginTest from './views/LoginTest';
import DevFeed from './views/DevFeed';
import TypeformContainer from './views/TypeformContainer';
import Events from './views/Events';
import SettingsCalendar from './views/SettingsCalendar';
import SettingsProfile from './views/SettingsProfile';
import DevEvents from './views/DevEvents';
import EditEvent from './views/EditEvent';
import PrivacyPolicy from './views/PrivacyPolicy'
import Terms from './views/Terms'
import Login from './views/Login';

// External URL redirect component
const RedirectExternal = ({ to }) => {
  window.location.href = to;
  return null;
};

function App() {

  return (  
    <>
      <BrowserRouter>
        <AppProvider>
          <SlotsProvider>
            <Routes>
              {/* OPEN ROUTES */}
              <Route exact path='/ryan' element={<Navigate to="/invite/Us2yiyZ789V5hrpdGmC9u9dxhIe2?name=Ryan%20Moran" replace />} />
              <Route exact path='/darby' element={<Navigate to="/invite/V20Lf5TIOrN0LVRLkzUBPQVmXnM2?name=Darby%20Rollins" replace />} />
              <Route exact path='/joinme/darby' element={<RedirectExternal to="https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/invites%2FJoin%20me%20on%20Hang%20-%20Darby.pdf?alt=media&token=6f330580-06ef-4a85-8b59-058cf08f8977" />} />
              <Route exact path='/joinme/ryan' element={<RedirectExternal to="https://firebasestorage.googleapis.com/v0/b/hang-app-50e03.firebasestorage.app/o/invites%2FJoin%20me%20on%20Hang%20-%20Ryan.pdf?alt=media&token=c5518842-93c7-47db-8848-155cc8c4c28d" />} />
              <Route exact path='/welcome' element={ <Welcome/> }/>
              <Route exact path='/terms' element={ <Terms/> }/>
              <Route exact path='/privacy-policy' element={ <PrivacyPolicy/> }/>
              <Route exact path='/login' element={ <Login/> }/>
              <Route exact path='/master' element={ <Master/> }/>
              <Route exact path='/onboarding' element={ <Onboarding/> }/>
              <Route exact path='/invite/:id' element={ <Invite/> } />
              {/* DEVELOPMENT: REMOVE WHEN PUSHING FOR PRODUCTION */}
              <Route exact path='/settings/friends/manage' element={ <SettingsFriendsManage/>} />
              {/* PROTECTED ROUTES */}
              <Route element={<ProtectedRoute />}>
                <Route exact path='/' element={ <Feed/> } />
                <Route exact path='/events' element={ <Events/>} />
                <Route exact path='/editEvent' element={ <EditEvent/>} />
                <Route exact path='/settings' element={ <Settings/>}/>
                <Route exact path='/settings/profile' element={ <SettingsProfile/>} />
                <Route exact path='/settings/friends' element={ <SettingsFriends/>} />
                <Route exact path='/settings/friends/manage' element={ <SettingsFriendsManage/>} />
                <Route exact path='/settings/friends/explore' element={ <SettingsFriendsExplore/>} />
                <Route exact path='/settings/calendar' element={ <SettingsCalendar/>} />
                <Route exact path='/settings/calendar/new' element={ <SettingsCalendarNew/>} />
                <Route exact path='/settings/notifications' element={ <SettingsNotifications/>} />
                <Route exact path='/settings/admin' element={ <SettingsAdmin/>} />
                <Route exact path='/notifications' element={ <Notifactions/> } />
                <Route exact path='/assistant' element={ <Assistant/>} />
                <Route exact path='/create' element={ <Create/>} />
                <Route exact path='/create/hang' element={ <CreateHang/>} />
                <Route exact path='/create/now' element={ <CreateNow/>} />
                <Route exact path='/feedback' element={ <TypeformContainer/>} />
              </Route>
            </Routes>
          </SlotsProvider>
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
