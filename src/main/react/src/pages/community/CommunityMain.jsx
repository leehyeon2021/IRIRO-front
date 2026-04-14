import React from "react";
import { Outlet, useLocation } from "react-router-dom"; // [추가] useLocation 임포트
import "../../css/community/CommunityMain.css";
import CommunityHeader from "../../components/layout/CommunityHeader.jsx";
import logoGhost from "../../assets/my_location_marker.png";
import CommunityFooter from "../../components/layout/CommunityFooter.jsx";
import MainHeader from "../../components/layout/MainHeader.jsx";

export default function CommunityMain() {
    const location = useLocation(); // 현재 경로 정보를 가져옴

    // [설명] 현재 경로가 정확히 "/community" 일 때만 로고 헤더를 보여준다.
    // 만약 "/community/view/1" 같은 상세 페이지로 가면 이 값은 false가 됨.
    const isMainPage = location.pathname === "/community";

    return (
        <div className="community-layout">
            <MainHeader />
            <CommunityHeader />
            <div className="commu-container">
                {/* [수정] 메인 페이지일 때만 로고와 타이틀 출력 */}
                {isMainPage && (
                    <header className="commu-header">
                        <img src={logoGhost} alt="IRIRO 로고" className="main-logo-img" />
                        <h1>IRIRO COMMUNITY</h1>
                        <p className="mini-title">불편한 점이 있으셨나요? <br/> 게시판에 남겨주시면 큰 도움이 됩니다!</p>
                    </header>
                )}

                <main className="commu-content">
                    <Outlet /> 
                </main>
            </div>

            <CommunityFooter />
        </div>
    );
}