
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn, MyPage, Archive} from '../pages';



const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
         <Route path='/signin' element={<SignIn />} />
         <Route path='/mypage' element={<MyPage />} />
         <Route path='/archive' element={<Archive />} />
       </Routes>
    </BrowserRouter>
  );
};

export default Router