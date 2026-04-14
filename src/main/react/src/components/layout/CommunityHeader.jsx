import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/community/CommunityHeader.css";

export default function CommunityHeader(props){
  
    const [user,setUser] = useState( null );
    const [login,setLogin] = useState( false );

    const getMyInfo = async () => {
        const token = localStorage.getItem('token');
        if(!token){return;}
        const response = await axios.get(
            'http://localhost:8080/api/user/myinfo', 
            { headers : { Authorization : `Bearer ${token}` } } 
        );

        const data = response.data;
        if(data || data != false ){
            setLogin( true );
            setUser( data );
        }else{
            setLogin(false);
        }
    }

    useEffect( () => { getMyInfo(); } , [] )

    const logout = () => {
        localStorage.removeItem('token');
        setLogin(false);
        alert('로그아웃되었습니다.'); location.href="/community";
    }

    return(
        /* [필수] 전체를 감싸는 wrapper 클래스 추가 */
        <div className="header-wrapper">
            {/* [필수] 가로폭과 정렬을 담당하는 컨테이너 클래스 추가 */}
            <div className="header-nav-container">
                

                {/* 로그인 메뉴가 나올 오른쪽 영역 */}
                <div className="header-right">
                    { login == true && (
                        <>
                            {/* 마이페이지 링크 스타일 */}
                            <Link to="/MyInfo" className="nav-map">마이페이지</Link>
                            {/* 글쓰기 링크 스타일 */}
                            <Link to="/community/write" className="nav-write">글쓰기</Link>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}