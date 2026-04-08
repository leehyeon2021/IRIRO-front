import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/community/CommunityList.css"; 

export default function CommunityList() {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/board/list")
            .then(res => setPostList(res.data))
            .catch(err => console.log("에러 발생:", err));
    }, []);

    const bestPosts = [...postList]
        .sort((a, b) => (b.recommendCount || 0) - (a.recommendCount || 0))
        .slice(0, 5);

    return (
        <div className="list-container">
            <section className="best-section">
                <h3 className="section-title">🔥 지금 사람들이 주목하고 있는 글</h3>
                <div className="best-list">
                    {bestPosts.map(post => (
                        <div key={post.boardId} className="best-item">
                            <span className="badge">인기</span> {post.boardTitle}
                        </div>
                    ))}
                </div>
            </section>

            <hr className="divider" />

            <section className="all-section">
                <h3 className="section-title">📬 전체 게시글 목록</h3>
                <div className="post-grid">
                    {postList.map((post) => (
                        <Link to={`/community/view/${post.boardId}`} key={post.boardId} className="post-card">
                            <div className="card-top">
                                <span>번호 : {post.boardId}</span>
                                <span>작성일 : {post.createDate?.split("T")[0] || '2026-04-08'}</span>
                                <span>추천수 : {post.recommendCount || 0}</span>
                            </div>
                            <div className="card-bottom">
                                <span className="title-label">제목 : </span>
                                <span className="title-content">{post.boardTitle}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}