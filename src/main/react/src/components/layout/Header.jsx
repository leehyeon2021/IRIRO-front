import { Link } from "react-router-dom";

export default function Header(props){
    return(<div>
        <Link to="/"> 홈 </Link>
        <Link to="/user/login"> 로그인 </Link> |
        <Link to="/user/join"> 회원가입 </Link> |
        <span> ooo님 , 환영합니다! </span> <br />
        <Link to="/user/myinfo"> 마이페이지 </Link>
        <Link to="/board/rvwrite"> 글쓰기 </Link>
        <button> 로그아웃 </button>
    </div>)
}