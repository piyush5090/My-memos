import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AboutUs from './pages/about'
import Group from './pages/groups'
import GroupNotesPage from './pages/groupNotesPage'
import UserList from './components/addMembers'
import GroupMembersPage from './components/groupMembers'
import LandingPage from './pages/landingPage'

const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard" exact element={<Home />}/>
      <Route path="/" exact element={<LandingPage />}/>
      <Route path="/signup" exact element={<Signup />}/>
      <Route path='/about' exact element={<AboutUs/>} />
      <Route path='/groups' exact element={<Group />} />
      <Route path='/groupNotes/:groupId' exact element={<GroupNotesPage />} />
      <Route path='/group/:groupId/members' exact element={<GroupMembersPage />} />
      <Route path='/temp' exact element={<UserList />} />
      <Route path='/login' exact element={<Login />}/>
    </Routes>
  </Router>
)

function App() {
  return (
    <>
      {routes}
    </>
  )
}

export default App
