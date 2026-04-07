import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CommunityList() {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/board/list")
            .then(res => setPostList(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h2>이리로 게시판 목록</h2>
            <table>
                <thead>
                    <tr>
                        <th>글번호</th><th>작성자</th>
                        <th>작성일</th><th>추천수</th><th>제목</th>
                    </tr>
                </thead>
                <tbody>
                    {postList.map(post => (
                        <tr key={post.bno}>
                            <td>{post.bno}</td>
                            <td>{post.mname}</td>
                            <td>{post.createDate?.split("T")[0]}</td>
                            <td>{post.brecommend}</td>
                            <td>{post.btitle}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}