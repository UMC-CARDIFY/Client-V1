import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SignIn } from './pages/SignIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </Router>
  )
}

export default App
