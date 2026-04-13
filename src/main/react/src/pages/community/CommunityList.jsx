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

                // 모든 게시글을 돌면서 좌표 => 주소로 변환
                const postsWithAddress = await Promise.all(posts.map(async(post)=>{
                    console.log("포스트 좌표 확인:", post.startLongitude, post.startLatitude);
                    const addr = await getAddress(post.startLongitude , post.startLatitude);
                    return { ...post , addressName : addr }; // 게시글 데이터에 주소 추가
                }));
                setPostList(postsWithAddress);
            })
            .catch(err => console.log("에러 발생:", err));
    }, []);


    const bestPosts = [...postList]
        .sort((a, b) => (b.recommendCount || 0) - (a.recommendCount || 0))
        .slice(0, 5);

    
    const getAddress = async ( x , y ) => {
        try{
            const res = await axios.get(`http://localhost:8080/api/test-address?x=${x}&y=${y}`);
            return res.data.documents[0].address.address_name;
        }catch(err){return "주소 찾기 실패";}
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
                                <span>위치 : {post.addressName || " 잠시만 기다려주세요! 로딩 중 . . . "}</span>
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