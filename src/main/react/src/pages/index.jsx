import React from "react";
// 1. Routes와 Route를 react-router-dom에서 가져와야 합니다.
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout.jsx";
import MainPage from './map/MainPage.jsx';
import CommunityMain from "./community/CommunityMain.jsx";
import CommunityList from "./community/CommunityList.jsx";
import ArticleMain from "./article/ArticleMain.jsx";

// 2. 하위 경로에서 사용할 Login과 Write도 여기서 가져와야 합니다.
import Login from "./community/Login.jsx";
import Sign from "./community/Sign.jsx";
import Write from "./community/Write.jsx";
import DetailView from "./community/DetailView.jsx";
import MyInfo from "./community/MyInfo.jsx";


export default function Index() {
    return (
        <div id="wrap">
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path='/' element={< MainPage />}></Route> {/* 메인페이지 */}
                    <Route path='/MyInfo' element={<MyInfo/>} /> 
                    {/* /community 그룹 */}
                    <Route path='/community' element={<CommunityMain />}>
                        <Route index element={<CommunityList />} />
                        <Route path='login' element={<Login />} />
                        <Route path='sign' element={<Sign />} />
                        <Route path='write' element={<Write />} />
                        <Route path='DetailView/:boardId' element={<DetailView/>} />
                    </Route>
                    <Route path='/articles/*' element={<ArticleMain />} />
                </Route>
            </Routes>
        </div>
    );
}