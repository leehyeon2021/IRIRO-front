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

            </header>

            <main className="commu-content">
                <Outlet /> 
            </main>
        </div>
    );
}