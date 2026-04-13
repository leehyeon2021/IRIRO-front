import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../../css/community/Sign.css";

export default function Sign(props){
    const navigate = useNavigate(); // 반드시 최상단에

    const onSignup = async (e) => {
        e.preventDefault();
    
    
    
    // 폼 데이터 가져오기
   const email = e.target.email.value;
   const pwToken = e.target.pwToken.value;
   const nickname = e.target.nickname.value;

   // 보낼 객체 만들기
   const obj = {email,pwToken,nickname};

   // AXIOS 통신
        const response = await axios.post(
            'http://localhost:8080/api/user/join',  // 통신할(스프링 컨트롤러 매핑) 주소
            obj
        );
    

    if(response.data == true){alert('회원가입에 성공했습니다!'); navigate("/community/login");
    }else{alert('회원가입에 실패하였습니다!');}
}
    
  return (
        <div className="join-container">
            <div className="join-card">
                <h2 className="join-title">회원가입</h2>
                <form onSubmit={onSignup}>
                    <div className="join-form-group">
                        <label>이메일</label>
                        <input name="email" type="email" className="join-input" placeholder="example@naver.com" required />
                    </div>

                    <div className="join-form-group">
                        <label>비밀번호</label>
                        <input name="pwToken" type="password" className="join-input" placeholder="비밀번호를 입력하세요" required />
                    </div>

                    <div className="join-form-group">
                        <label>닉네임</label>
                        <input name="nickname" type="text" className="join-input" placeholder="사용할 닉네임" required />
                    </div>

                    <button type="submit" className="join-submit-btn">가입하기</button>
                </form>

                <div className="login-link-text">
                    이미 회원이신가요? <Link to="/login">로그인하기</Link>
                </div>
            </div>
        </div>
    );
}