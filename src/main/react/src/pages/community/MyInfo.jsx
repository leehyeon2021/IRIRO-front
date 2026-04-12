import axios from "axios";
import { useEffect, useState } from "react";


export default function MyInfo(props){

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
                    <td>{item.boardTitle}</td>
                    <td>{item.nickname}</td>
                    <td>{item.createdAt}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
    </>)
    




}