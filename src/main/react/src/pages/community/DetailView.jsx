import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


export default function DetailView(props){

    // [1] 현재 URL 상의 쿼리스트링 값 가져오기 , 조회할 게시물 번호 가져오기
    const [params]=useSearchParams() // 예] http://localhost:5173/community/DetailView?boardId=11
    const bno = params.get("boardId"); // URL 상의 bno 값 가져오기 , 11

    const [post,setPost] = useState(null); // [3] axios 결과 담는 상태변수

    const findById = async() => { // [2] axios
        try{
            const response = await axios.get(`http://localhost:8080/api/board/detail?boardId=${boardId}`);
            const data = response.data;
            setBoard(data);
        }catch(e){console.log(e);}
    }

    useEffect( ()=>{ findById() } , [] ); // [4] 실행시점

    // [5] 만약에 아직 axios의 결과가 없으면
    if(!post) return <div> 불러오는 중 </div>

    return(<div>
        <h3> 게시물 상세 </h3>
        <div> 작성자 : {post.nickName} | 작성일 : {post.createDate} </div>
        <div> 제목 : {post.boardTitle} </div>
        <div> 내용 : {post.boardContent} </div>
        <div> 따봉 : {post.recommendCount} </div>

        { /* 만약에 웹에디터 사용할 경우 에는 HTML 형식으로 저장되므로 HTML 형식으로 출력해야한다. */}
        {/* 리액트는 가상 DOM이라서 직접적인 HTML 대입 비권장한다. */}
        <div dangerouslySetInnerHTML={{__html:post.boardContent}}/>
        {/* "DB에 저장된 글 내용에 HTML 태그(예: <b>, <img>, <br/>)가 섞여 있을 때, 이걸 글자가 아니라 진짜 효과로 보여주고 싶을 때" */}
        
    </div>)
}