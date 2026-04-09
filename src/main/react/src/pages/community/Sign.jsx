import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Sign(props){
    const onSignup = async (e) => {
        e.preventDefault();
    
    // 폼 데이터 가져오기
   const email = e.target.email.value;
   const pwToken = e.target.pwToken.value;
   const nickName = e.target.nickName.value;

   // 보낼 객체 만들기
   const obj = {email,pwToken,nickName};

   // AXIOS 통신
        const response = await axios.post(
            'http://localhost:8080/api/user/join',  // 통신할(스프링 컨트롤러 매핑) 주소
            obj
        );
    

    if(response.data == true){alert('회원가입에 성공했습니다!'); location.href="./login";
    }else{alert('회원가입에 실패하였습니다!');}
}
    
    return(<>
    <div>
        <h3> 회원가입 페이지 </h3>
        <form onSubmit={onSignup}>
            아이디 : <input name="email"/> <br/>
            비밀번호 : <input name="pwToken" type="password"/> <br/>
            닉네임 : <input name="nickName"/>
            <button type="submit"> 가입 </button>
        </form>
    </div>
    </>)
}