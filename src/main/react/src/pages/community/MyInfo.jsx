import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function MyInfo(props){
    const navigate = useNavigate();

    const[mylist,setMyList] = useState({boards:[] , replies:[] });
    const token = localStorage.getItem('token');

    useEffect(()=>{
        axios.get("http://localhost:8080/api/user/myinfo",
            {
                headers:{'Authorization': `Bearer ${token}`}
            }
        )
        .then(res => {
            console.log("서버에서 받은 데이터 :",res.data);
            setMyList(res.data);
        })
        .catch(err=>console.log("에러발생:", err));
    },[]);

    const clickDetail = (boardId) => {
        navigate(`/community/DetailView/${boardId}`);
    }



    return(<>

    <div>
        <h2> 마이페이지 </h2>
        <table>
            <thead>
                <tr>
                    <th>글번호</th><th>제목</th>
                    <th>작성자</th><th>작성일</th>
                </tr>
            </thead>

            <tbody>
                {mylist?.myBoards && mylist.myBoards.map((item) => (
                    <tr key={item.boardId}>
                    <td>{item.boardId}</td>
                    <td onClick={() => clickDetail(item.boardId)}>{item.boardTitle}</td>
                    <td>{item.nickname}</td>
                    <td>{item.createdAt}</td>
                </tr>
                ))}
            </tbody>
        </table>

        <table>
            <thead>
                <tr>
                    <th>댓글번호</th>
                    <th>댓글내용</th>
                    <th>게시글번호</th>
                    <th>작성일</th>
                </tr>
            </thead>
            <tbody>
                {mylist?.myReplies && mylist.myReplies.length > 0 ? (
                    mylist.myReplies.map((reply) => (
                        <tr key={reply.replyId}>
                            <td>{reply.replyId}</td>
                            <td>{reply.replyContent}</td>
                            <td>{reply.boardId}</td>
                            <td>{reply.createdAt?.split('T')[0]}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">작성한 댓글이 없습니다.</td>
                    </tr>
                )}
            </tbody>
           
        </table>
    </div>
    </>)
    




}