import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Write from './Write.jsx';

    <Routes>
        <Route path='/login' element={< Login />}></Route> {/* 로그인 페이지 */}
        <Route path='/write' element={< Write />}></Route> {/* 글쓰기 페이지 */}    
    </Routes>
        
export default function CommunityMain(props){
    return(<> 
    <div>
        <image></image>
        <h2>이리로 게시판 목록</h2>
        <table>
            <thead>
                <tr>
                    <th>글번호</th><th>제목</th>
                    <th>작성자</th><th>작성일</th>
                    <th>추천수</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td><td>테스트</td>
                    <td>박진감</td><td>2026-04-07</td>
                    <td>1000</td>
                </tr>
            </tbody>
        </table>
    </div>
  </>)
};