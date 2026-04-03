import { Routes, Route } from 'react-router-dom';
import MainPage from './map/MainPage.jsx';
import CommunityMain from './community/CommunityMain.jsx';
import Login from './community/Login.jsx';


export default function index(props){
    return(<>
    {/* <Header></Header> 추후에 헤더들어감 -> 왼쪽 위 로그(이리로)*/}
    <Routes>
        <Route path='/' element={< MainPage />}></Route> {/* 메인페이지 */}
        <Route path='/community' element={< CommunityMain />}></Route> {/* 커뮤니티 메인페이지 */}
         <Route path='/login' element={< Login />}></Route> {/* 로그인 페이지 */}
         
        {/* 밑에 계속 추가 */}
    </Routes>
    {/* <Footer></Footer> 추후에 푸터들어감 */}
    </>)
}