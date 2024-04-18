import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Signin } from './pages/signin';
import { Dashboard } from './pages/dashboard';
import { Signup } from './pages/signup';
import { CreateClient } from './pages/createClient';
import { EditClient } from './pages/editClient';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/createClient" element={<CreateClient />} />
          <Route path="/editClient" element={<EditClient />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/' element={localStorage.getItem('token') ? <Dashboard /> : <Signin />} />
        </Routes>
      </BrowserRouter>
    </>
    </RecoilRoot>
  )
}

export default App
