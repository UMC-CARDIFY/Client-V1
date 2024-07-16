import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { MyPage } from './pages/MyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/mypage' element={<MyPage />} />
      </Routes>
    </Router>
  )
}

export default App
