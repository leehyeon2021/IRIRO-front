import axios from "axios";

export default function Login(props){
    const login = async( e ) => { e.preventDefault(); 
        const email = e.target.email.value;
        const pwToken = e.target.pwToken.value;
        const obj = {email,pwToken}
        const response = await axios.post(
            "http://localhost:8080/api/user/login" , obj );
            let token = response.headers['authorization'];
            if( token && token.startsWith("Bearer ") ){
                token = token.substring(7);
            }
            if( token ){
                localStorage.setItem("token",token);
                alert('로그인에 성공하였습니다.');
                location.href="/community";
            }else{
                alert('로그인에 실패하였습니다.');
            }
     }
    return(<>
    <div>
        <h3> 로그인 페이지 </h3>
        <form onSubmit={ login }>
            아이디 : <input name="email" placeholder="아이디(이메일 형식) 입력"/> <br />
            비밀번호 : <input name="pwToken" type="password" placeholder="비밀번호 입력"/> <br />
            <button type="submit"> 로그인 </button>
        </form>
    </div>
    </>)
}