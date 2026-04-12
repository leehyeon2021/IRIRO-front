import axios from "axios";
import { useEffect, useState } from "react";


export default function MyInfo(props){

    const[mylist,setMyList] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8080/api/user/myinfo")
        .then(res => setMyList(res.data))
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
                <tr>
                    <td>1</td><td>테스트제목</td>
                    <td>박진감</td><td>2026-04-10</td>
                </tr>
            </tbody>
        </table>
    </div>
    </>)
    




}