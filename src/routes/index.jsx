import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn, SignUp, VerifyEmail, CompleteSignUp, MyPage, Archive, Dashboard, PointPage, SubscriptionPage, NoteEditor, Flashcard } from "../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-up/verify' element={<VerifyEmail />} />
        <Route path='/sign-up/complete' element={<CompleteSignUp />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/mypage/point' element={<PointPage />} />
        <Route path='/mypage/subscription' element={<SubscriptionPage />} />
        <Route path='/archive' element={<Archive />} />
        <Route path='/dashboard' element={<Dashboard />} /> 
        <Route path='/note-editor' element={<NoteEditor />} /> 
        <Route path='/flashcard' element={<Flashcard />} />
       </Routes>
    </BrowserRouter>
  );
};

export default Router