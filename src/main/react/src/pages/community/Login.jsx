import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/community/Login.css";

export default function Login(props) {
    const login = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const pwToken = e.target.pwToken.value;
        const obj = { email, pwToken };

        try {
            const response = await axios.post("http://localhost:8080/api/user/login", obj);
            let token = response.headers['authorization'];
            
            if (token && token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            
            if (token) {
                localStorage.setItem("token", token);
                alert('로그인에 성공하였습니다.');
                location.href = "/community";
            } else {
                alert('로그인에 실패하였습니다.');
            }
        } catch (error) {
            console.error(error);
            alert('로그인 처리 중 에러가 발생했습니다.');
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">로그인</h2>
                <form onSubmit={login}>
                    <div className="login-form-group">
                        <label>이메일</label>
                        <input 
                            name="email" 
                            className="login-input" 
                            placeholder="아이디(이메일)를 입력하세요" 
                            required 
                        />
                    </div>

                    <div className="login-form-group">
                        <label>비밀번호</label>
                        <input 
                            name="pwToken" 
                            type="password" 
                            className="login-input" 
                            placeholder="비밀번호를 입력하세요" 
                            required 
                        />
                    </div>

                    <button type="submit" className="login-submit-btn">로그인</button>
                </form>

                <div className="signup-link-text">
                    계정이 없으신가요? <Link to="/community/sign">회원가입하기</Link>
                </div>
            </div>
        </div>
    );
}