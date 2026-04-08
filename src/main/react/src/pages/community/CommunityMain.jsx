import React from "react";
import { Outlet } from "react-router-dom";
import "./CommunityMain.css";


export default function CommunityMain() {
    return (
        <div className="community-layout">
            <header className="commu-header">
                <div></div><h1>IRIRO COMMUNITY</h1>

            </header>

            <main className="commu-content">
                <Outlet /> 
            </main>

            <footer className="commu-footer">
                <button onClick={() => window.location.href='/'}>↩ 지도로 돌아가기</button>
            </footer>
        </div>
    );
}