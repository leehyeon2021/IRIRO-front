import React from "react";
// 1. Routes와 Route를 react-router-dom에서 가져와야 합니다.
import { Routes, Route } from "react-router-dom";

import MainPage from "./map/MainPage.jsx";
import CommunityMain from "./community/CommunityMain.jsx";
import CommunityList from "./community/CommunityList.jsx";
import ArticleMain from "./article/ArticleMain.jsx";

// 2. 하위 경로에서 사용할 Login과 Write도 여기서 가져와야 합니다.
import Login from "./community/Login.jsx";
import Write from "./community/Write.jsx";

// Header 경로 확인 (상위 폴더로 나갔다 들어가는 경로)
import Header from "../components/layout/Header.jsx";

export default function Index(props) {
    return (
        <div id="wrap">
            <Header />
            <Routes>
                <Route path='/' element={<MainPage />} />
                
                {/* /community 그룹 */}
                <Route path='/community' element={<CommunityMain />}>
                    <Route index element={<CommunityList />} />
                    <Route path='login' element={<Login />} />
                    <Route path='write' element={<Write />} />
                </Route>

                <Route path='/article' element={<ArticleMain />} />
            </Routes>
        </div>
    );
import { Routes, Route } from 'react-router-dom';
import MainLayout from "../components/layout/MainLayout.jsx";
import MainPage from './map/MainPage.jsx';


export default function index(props) {
    return (<>
        {/* <Header></Header> 추후에 헤더들어감 -> 왼쪽 위 로그(이리로)*/}
        <Routes>
            <Route element={<MainLayout />}>
                <Route path='/' element={< MainPage />}></Route> {/* 메인페이지 */}
            </Route>
            {/* 밑에 계속 추가 */}
        </Routes>
        {/* <Footer></Footer> 추후에 푸터들어감 */}
    </>)
}