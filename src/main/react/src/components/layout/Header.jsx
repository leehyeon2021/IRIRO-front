import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header(props){
  
    // [3] 로그인 중인 회원정보 담는 상태변수
    const [user,setUser] = useState( null ); // 초기값은 비로그인 상태

    // [2] 로그인 상태 저장하는 상태변수
    const [login,setLogin] = useState( false ); // 초기값은 false 로그인 안 했다는 뜻

    // [1] 로그인 상태에 따라 상단메뉴 분기
    const getMyInfo = async () => {
        // 1) 로그인시 localStorage 저장한 token 가져오기 , .setItem , .getItem
        const token = localStorage.getItem('token');
        // 2) 만약에 token이 없으면 함수 종료
        if(!token){return;}
        // 3) 헤더에 표시할 로그인된 유저 아이디 가져오기
        const response = await axios.get(
            'http://localhost:8080/api/user/myinfo', // 통신할(스프링 컨트롤러 매핑) 주소
            { headers : { Authorization : `Bearer ${token}` } } 
        );

        // 4) 통신 결과 분기
        const data = response.data;
        if(data || data != false ){ // 응답 자료가 존재하면
            setLogin( true ); // 로그인 상태 변경
            setUser( data ); // 응답 받은 자료(회원정보) 저장
        }else{
            setLogin(false); // 비로그인 상태 변경
        }
    }

      // [4] 헤더가 열리면 최초 1번 실행 , 로그인 상태 (백엔드 검증해야 한다.)
      useEffect( () => { getMyInfo(); } , [] )

    return(<div>
        {/* 로그인 상태에 따른 메뉴 분기 */}
        <Link to="/"> 홈 </Link>

        {/* 비로그인 메뉴 */}
        { login == false && (<>
                <Link to="/user/login"> 로그인 </Link> |
                <Link to="/user/join"> 회원가입 </Link> |
        </>)}

        {/* 로그인 메뉴 */}
        { login == true && (<>
                <span> ooo님 , 환영합니다! </span> <br />
                <Link to="/user/myinfo"> 마이페이지 </Link>
                <Link to="/board/rvwrite"> 글쓰기 </Link>
                <button> 로그아웃 </button>
        </>)}

    
    </div>)
}