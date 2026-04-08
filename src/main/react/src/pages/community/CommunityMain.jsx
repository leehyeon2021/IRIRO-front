import React from "react";
import { Outlet } from "react-router-dom";
import "./CommunityMain.css";


export default function CommunityMain() {
    return (
        <div className="community-layout">
            <header className="commu-header">
                <h1>IRIRO COMMUNITY</h1>
            </header>

            {/* 주소에 따라 List, Login, Write가 이 자리에 교체되어 나옴 */}
            <main className="commu-content">
                <Outlet /> 
            </main>

            <footer className="commu-footer">
                <button onClick={() => window.location.href='/'}>↩ 지도로 돌아가기</button>
            </footer>
        </div>
    );
}