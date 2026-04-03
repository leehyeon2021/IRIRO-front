import axios from "axios";

export default function Login(props){
    // [1] REST API 에게 AXIOS로 통신하기.
    const login = async( e ) => { e.preventDefault(); // form 마크업의 기본 이벤트 제거
        // 1) 입력받은 값 가져오기
        const email = e.target.email.value;
        const pwToken = e.target.pwToken.value;
        // 2) 객체 구성 : 전송할 내용
        const obj = {email,pwToken}
        // 3) axios 동기 통신
        const response = await axios.post(
            "http://localhost:8080/api/user/login" , obj );
            // 4) 인증 결과 확인 ( HTTP headers에 Authorization 속성 확인 )
            let token = response.headers['authorization'];
            // 5) 인증 결과 분기
            if( token && token.startsWith("Bearer ") ){
                token = token.substring(7); // 문자열 내 7번째부터 자른 값 대입 , 즉] Bearer 제거
            }
            if( token ){
                /* 페이지 이동하기 전에 localStorage에 토큰 저장, 예] 글쓰기 저장할 경우 토큰이 필요하다. */
                localStorage.setItem("token",token);
                // token 이라는 이름을 서버로부터 받은 token 저장
                alert('로그인에 성공하였습니다.');
                location.href="/community"; // 메인페이지 이동, (인증=로그인/로그아웃) 주의할 점 : navigate 대신에 location
            }else{
                alert('로그인에 실패하였습니다.');
            }

            


     }
    return(<>
    <div>
        <h3> 로그인 페이지 </h3>
        <form onSubmit={ login }> {/* 통신함수연결 */}
            아이디 : <input name="email" placeholder="아이디(이메일 형식) 입력"/> <br />
            비밀번호 : <input name="pwToken" placeholder="비밀번호 입력"/> <br />
            <button type="submit"> 로그인 </button>
            { /* submit : 현재 form 안에 있는 마크업들 전송 이벤트 */}
        </form>
    </div>
    </>)
}