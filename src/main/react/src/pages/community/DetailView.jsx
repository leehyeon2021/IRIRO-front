import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


export default function DetailView(props){


    
    const replyWrite = async(e)=>{ e.preventDefault();
        try{
            const token = localStorage.getItem('token');
            const replyContent = e.target.replyContent.value;

            const replyData = {
            replyContent:replyContent,
            boardId:boardId
            };
            
            const replyResponse = await axios.post(
                'http://localhost:8080/api/board/rp',
                replyData,
                { headers:{Authorization:`Bearer ${token}`}}
            );

            const data = replyResponse.data;
            if(data == true){alert('댓글이 등록되었습니다.');
            }


        }catch(e){console.error('댓글 등록 실패 : ',e);}

    }
       // 따봉 글 추천
    const ddabong = async() => {
        try{
            const response = await axios.post(`http://localhost:8080/api/board/ddabong?boardId=${boardId}`);
            
            if(response.status===200){findById(); alert('따봉 성공!')}
        }catch(e){console.error("따봉 실패 : " , e);}
    };


    // [1] 현재 URL 상의 쿼리스트링 값 가져오기 , 조회할 게시물 번호 가져오기
    const [params]=useSearchParams() // 예] http://localhost:5173/community/DetailView?boardId=11
    const boardId = params.get("boardId"); // URL 상의 bno 값 가져오기 , 11

    const [post,setPost] = useState(null); // [3] axios 결과 담는 상태변수

    const findById = async() => { // [2] axios
        try{
            const response = await axios.get(`http://localhost:8080/api/board/detail?boardId=${boardId}`);
            const data = response.data;
            setPost(data);
        }catch(e){console.log(e);}
    }

    useEffect( ()=>{ findById() } , [] ); // [4] 실행시점

    // [5] 만약에 아직 axios의 결과가 없으면
    if(!post) return <div> 불러오는 중 </div>

    return(<div>
        <h3> 게시물 상세 </h3>
        <div> 작성자 : {post.nickname} | 작성일 : {post.createdAt} </div>
        <div> 제목 : {post.boardTitle} </div>
        <div> 내용 : {post.boardContent} </div>
        <div> 따봉 : {post.recommendCount} </div>
        <button on onClick={ddabong}> 따봉하기👍🏻 </button>

        <div>
            <form onSubmit={replyWrite}>
                댓글 내용 : <input name="replyContent" placeholder="댓글을 입력해주세요."></input>
                <button type="submit">등록</button>
            </form>
        </div>
    </div>)
}