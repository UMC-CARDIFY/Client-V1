import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { VerifyEmail } from './pages/SignUp/verifyEmail';
import { CompleteSignUp } from './pages/SignUp/completeSignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signup/verify' element={<VerifyEmail />} />
        <Route path='/signup/complete' element={<CompleteSignUp />} />
      </Routes>
    </Router>
  )
}

export default App
