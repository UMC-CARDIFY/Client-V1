import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn, SignUp, VerifyEmail, CompleteSignUp, MyPage, Archive, Dashboard } from "../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signup/verify' element={<VerifyEmail />} />
        <Route path='/signup/complete' element={<CompleteSignUp />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/archive' element={<Archive />} />
        <Route path='/dashboard' element={<Dashboard />} /> 
       </Routes>
    </BrowserRouter>
  );
};

export default Router