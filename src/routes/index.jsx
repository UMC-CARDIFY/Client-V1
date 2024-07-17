import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn, SignUp, VerifyEmail, CompleteSignUp } from "../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signup/verify' element={<VerifyEmail />} />
        <Route path='/signup/complete' element={<CompleteSignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router