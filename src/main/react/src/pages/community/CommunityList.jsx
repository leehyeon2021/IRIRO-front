import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CommunityList() {

    
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/board/list")
            .then(res => {
                console.log("데이터 확인:", res.data); // 
                setPostList(res.data);
            })
            .catch(err => console.log("에러 발생:", err));
    }, []);

    // 추천수 높은 순으로 5개 정렬
    const bestPosts = [...postList]
    .sort((a,b)=>(b.recommendCount || 0) - (a.recommendCount || 0 ))
    .slice(0,5); 

    return (
        <div>
            <h2>이리로 게시판 목록</h2>
            <div>
                <h3> 지금 사람들이 주목하고 있는 글 </h3>
                <ul>
                    {bestPosts.map(post => (
                        <li key={post.boardId}>
                            [인기] {post.boardTitle} ([추천수] {post.recommendCount || 0})
                        </li>
                    ))}
                </ul>
            </div>

            <hr/>
           
           <h3> 전체 게시글 목록</h3>
            <table>
                <thead>
                    <tr>
                        <th>글번호</th><th>제목</th><th>추천수</th>
                    </tr>
                </thead>
                <tbody>
                    {postList.map((post) => (
                        <tr key={post.boardId}> 
                            <td>{post.boardId}</td>
                            <td>{post.boardTitle}</td>
                            <td>{post.recommendCount|| 0}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}