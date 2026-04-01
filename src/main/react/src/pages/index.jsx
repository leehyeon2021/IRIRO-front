import { Routes, Route } from 'react-router-dom';
import '../css/App.css';
import MainPage from './map/MainPage.jsx';


export default function index(props){
    return(<>
    {/* <Header></Header> 추후에 헤더들어감 */}
    <Routes>
        <Route path='/' element={< MainPage />}></Route> {/* 메인페이지 */}
        {/* 밑에 계속 추가 */}
    </Routes>
    {/* <Footer></Footer> 추후에 푸터들어감 */}
    </>)
}