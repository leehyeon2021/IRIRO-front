import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/community/CommunityList.css"; 

export default function CommunityList() {
    const [postList, setPostList] = useState([]);

useEffect(() => {
    axios.get("http://localhost:8080/api/board/list")
        .then(async (res) => {
            const posts = res.data;
            console.log("백엔드에서 받은 원본 데이터:", posts);

            const postsWithAddress = await Promise.all(posts.map(async (post) => {
                const addr = await getAddress(post.startLongitude, post.startLatitude);
                return { ...post, addressName: addr };
            }));

            console.log("주소 변환 완료 데이터:", postsWithAddress);
            setPostList(postsWithAddress);
        })
        .catch(err => {
            console.error("게시글 목록 불러오기 실패:", err);
        });
}, []);


    const bestPosts = [...postList]
        .sort((a, b) => (b.recommendCount || 0) - (a.recommendCount || 0))
        .slice(0, 5);

    
const getAddress = async (x, y) => {
    try {
        if (!x || !y) return "좌표 없음"; // 좌표가 없으면 바로 리턴
        const res = await axios.get(`http://localhost:8080/api/test-address?x=${x}&y=${y}`);
        
        // 데이터가 있는지 안전하게 체크
        if (res.data && res.data.documents && res.data.documents[0]) {
            return res.data.documents[0].address.address_name;
        }
        return "주소 정보 없음";
    } catch (err) {
        console.log("주소 변환 API 실패:", err);
        return "주소 찾기 실패"; // 에러가 나도 문자열을 리턴해서 전체 흐름을 안 깨지게 함
    }
}

    return (
        <div className="list-container">
            <section className="best-section">
                <h3 className="section-title">🔥 지금 사람들이 주목하고 있는 글</h3>
                <div className="best-list">
                    {bestPosts.map(post => (
                        <div key={post.boardId} className="best-item">
                            <span className="badge">인기</span>
                            <Link to={`/community/DetailView/${post.boardId}`}>{post.boardTitle}</Link>
                        </div>
                    ))}
                </div>
            </section>

            <hr className="divider" />

            <section className="all-section">
                <h3 className="section-title">📬 전체 게시글 목록</h3>
                <div className="post-grid">
                    {postList.map((post) => (

                        <Link to={`/community/DetailView/${post.boardId}`} className="post-card">
                            <div className="card-top">
                                <span>번호 : {post.boardId}</span>
                                <span>위치 : {post.addressName || " 주소값 로딩 중 . . . "}</span>
                                <span>작성일 : {post.createDate?.split("T")[0] || '2026-04-08'}</span>
                                <span>추천수 : {post.recommendCount || 0}</span>
                            </div>
                            <div className="card-bottom">
                                <span className="title-label">제목 : </span>
                                <span className="title-content">
                               {post.boardTitle}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}