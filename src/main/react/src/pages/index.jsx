import { Routes, Route } from "react-router-dom";
import MainPage from "./map/MainPage.jsx";
import CommunityMain from "./community/CommunityMain.jsx";
import CommunityList from "./community/CommunityList.jsx";
import ArticleMain from "./article/ArticleMain.jsx";
import Login from "./community/Login.jsx";
import Write from "./community/Write.jsx";

export default function Index(props) {
    return (
        <div id="wrap">
            <Routes>
                <Route path='/' element={<MainPage />} />
                
                {/* /community 그룹 */}
                <Route path='/community' element={<CommunityMain />}>
                    <Route index element={<CommunityList />} />
                    <Route path='login' element={<Login />} />
                    <Route path='write' element={<Write />} />
                </Route>

                <Route path='/articles' element={<ArticleMain />} />
            </Routes>
        </div>
    );
}