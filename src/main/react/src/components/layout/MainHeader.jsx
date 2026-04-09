import { Link } from "react-router-dom";
import "../../css/layout/MainHeader.css";
import iriroLogo from '../../assets/logo_iriro.png';

export default function MainHeader() {
    return (
        <header className="main-header">
            <div className="main-header-container">
                {/* [1] 왼쪽은 비워두고 로고/서비스명만 넣고 싶으면 여기에 추가 */}
                <div className="main-header-left">
                    <img src={iriroLogo} alt="이리로 로고" className="main-header-logo" />
                </div>

                {/* [2] 오른쪽 로그인/회원가입 메뉴 */}
                <div className="main-header-right">
                    <Link to="/community/login" className="main-header-link">
                        로그인
                    </Link>
                    <Link to="/community/sign" className="main-header-link signup">
                        회원가입
                    </Link>
                </div>
            </div>
        </header>
    );
}