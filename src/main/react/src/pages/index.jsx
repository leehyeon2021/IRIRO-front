import { Routes, Route } from 'react-router-dom';
import MainPage from './map/MainPage.jsx';
import CommunityMain from './community/CommunityMain.jsx';
import ArticleMain from './article/ArticleMain.jsx';
import Header from '../components/layout/Header.jsx';


export default function index(props){
    return(
        <div id="wrap">
            <Header/>
    <Routes>
        <Route path='/' element={< MainPage />}></Route> {/* 메인페이지 */}
        <Route path='/community' element={< CommunityMain />}></Route> {/* 커뮤니티 메인페이지 */}
        <Route path='/article' element={ <ArticleMain/>}></Route>

        {/* 밑에 계속 추가 */}
    </Routes>
    {/* <Footer></Footer> 추후에 푸터들어감 */}
    </div>)
}