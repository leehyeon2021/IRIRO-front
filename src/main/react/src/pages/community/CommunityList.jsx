import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CommunityList() {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        // 1. 주소를 컨트롤러에 맞게 /all 로 수정합니다.
        axios.get("http://localhost:8080/api/board/all")
            .then(res => {
                console.log("데이터 확인:", res.data); // 👈 콘솔에 데이터가 어떻게 오는지 꼭 찍어보세요!
                setPostList(res.data);
            })
            .catch(err => console.log("에러 발생:", err));
    }, []);

    return (
        <div>
            <h2>이리로 게시판 목록</h2>
            <table>
                <thead>
                    <tr>
                        <th>글번호</th><th>제목</th><th>추천수</th>
                    </tr>
                </thead>
                <tbody>
                    {postList.map((post) => (
                        // 2. key값과 필드명을 스프링 DTO 변수명과 일치시켜야 합니다.
                        // post.bno가 아니라 post.boardId 인지 확인!
                        <tr key={post.boardId || post.bno}> 
                            <td>{post.boardId || post.bno}</td>
                            <td>{post.boardTitle || post.btitle}</td>
                            <td>{post.boardRecommend || post.brecommend || 0}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}