import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/layout/MainHeader.css";
import iriroLogo from '../../assets/logo_iriro.png';


export default function MainHeader() {

    // [3] 로그인 중인 회원정보 담는 상태변수
    const [user, setUser] = useState(null); // 초기값은 비로그인 상태

    // [2] 로그인 상태 저장하는 상태변수
    const [login, setLogin] = useState(false); // 초기값은 false 로그인 안 했다는 뜻

    const getMyInfo = async () => {
        // 1) 로그인시 localStorage 저장한 token 가져오기 , .setItem , .getItem
        const token = localStorage.getItem('token');
        // 2) 만약에 token이 없으면 함수 종료
        if (!token) { return; }
        // 3) 헤더에 표시할 로그인된 유저 아이디 가져오기
        const response = await axios.get(
            'http://localhost:8080/api/user/myinfo', // 통신할(스프링 컨트롤러 매핑) 주소
            { headers: { Authorization: `Bearer ${token}` } }
        );

        // 4) 통신 결과 분기
        const data = response.data;
        if (data || data != false) { // 응답 자료가 존재하면
            setLogin(true); // 로그인 상태 변경
            setUser(data); // 응답 받은 자료(회원정보) 저장
        } else {
            setLogin(false); // 비로그인 상태 변경
        }
    }

    // [5] 로그아웃
    const logout = () => {
        // 1) localStorage 에서 token 제거 , .removeItem()
        localStorage.removeItem('token');
        // 2) 로그인 상태 변경
        setLogin(false);
        // 3)
        alert('로그아웃되었습니다.'); location.href = "/";
    }

    useEffect(() => { getMyInfo(); }, [])
    return (
        <header className="main-header">
            <div className="main-header-container">
                {/* [1] 왼쪽은 비워두고 로고/서비스명만 넣고 싶으면 여기에 추가 */}
                <div className="main-header-left">
                    <img src={iriroLogo} alt="이리로 로고" className="main-header-logo" />
                </div>

                {/* [2] 오른쪽 로그인/회원가입 메뉴 */}
                <div className="main-header-right">
                    { login == false ? (<>
                    <Link to="/community/login" className="main-header-link">
                        로그인
                    </Link>
                    <Link to="/community/sign" className="main-header-link signup">
                        회원가입
                    </Link>
                    </>) : (<>
                        <span>{user.nickname}님</span>
                        <button onClick={logout}> 로그아웃 </button>
                    </>)
                }
                    
                </div>
            </div>
        </header>
    );
}