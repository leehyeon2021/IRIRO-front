import axios from "axios";
import { useState , useEffect} from "react"; 
import { Link, useNavigate } from "react-router-dom";
import '../../css/community/CommunityMain.css';

export default function CommunityFooter( props ){

    const navigate = useNavigate();

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

      // [5] 로그아웃
      const logout = () => {
        // 1) localStorage 에서 token 제거 , .removeItem()
        localStorage.removeItem('token');
        // 2) 로그인 상태 변경
        setLogin(false);
        // 3)
        alert('로그아웃되었습니다.'); location.href="/community";
      }

    return (
        <div className="header-sticky">
            <Link className="headerNavi" to="/"> ↩️ 지도로 돌아가기 </Link>
            <Link className="headerNavi" to="/community"> 게시판 홈 </Link>
            <Link className="headerNavi" to="/articles"> 📰 기사 게시판 </Link>
        </div>
    );
}