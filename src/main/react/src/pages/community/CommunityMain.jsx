import React from "react";
import { Outlet } from "react-router-dom";
import "../../css/community/CommunityMain.css";
import Header from "../../components/layout/Header.jsx";
import logoGhost from "../../assets/my_location_marker.png";


export default function CommunityMain() {
    return (
        <div className="community-layout">
            <Header />
            <header className="commu-header">
                <img src={logoGhost} alt="IRIRO 로고" className="main-logo-img" />
                <div></div><h1>IRIRO COMMUNITY</h1>
                <p className="mini-title">불편한 점이 있으셨나요? 게시판에 남겨주시면 큰 도움이 됩니다!</p>
            </header>

            <main className="commu-content">
                <Outlet /> 
            </main>
        </div>
    );
}