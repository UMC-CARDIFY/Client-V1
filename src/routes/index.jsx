import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import {
  SignIn, SignUp, VerifyEmail, CompleteSignUp, MyPage,
  Archive, Dashboard, PointPage, NoteEditor,
  Flashcard, KaKaoCallback, Library, FolderDetail
} from "../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 경로에 접속했을 때 로그인 페이지로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/sign-in" replace />} />
        
        {/* Layout을 제외한 페이지 (예: 로그인 관련) */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/oauth2/callback/kakao" element={<KaKaoCallback />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-up/verify" element={<VerifyEmail />} />
        <Route path="/sign-up/complete" element={<CompleteSignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/note-editor" element={<NoteEditor />} />
        <Route path="/flashcard" element={<Flashcard />} />
        <Route path="/library" element={<Library />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/point" element={<PointPage />} />
        
        {/* Layout을 사용하는 페이지 */}
        <Route element={<Layout />}>
          <Route path="/archive" element={<Archive />} />
          <Route path="/archive/folder/:folderId" element={<FolderDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
