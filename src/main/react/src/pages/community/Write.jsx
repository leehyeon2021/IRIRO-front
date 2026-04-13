import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/community/Write.css"

export default function Write(props){

    const navigate = useNavigate();
    
    // [1] REST API로 글쓰기 요청
    const boardWrite = async(e) => { e.preventDefault();
        // 0) token
        const token = localStorage.getItem('token');
        // 1) 입력받은 값 가져오기
        const boardTitle = e.target.boardTitle.value;
        const boardContent = e.target.boardContent.value;
        
        // 2) 나는 파일 첨부 안 하니까 FormData 말고 기본 자바스크립트 객체 사용
        const boardData = {
            boardTitle:boardTitle,
            boardContent:boardContent,
            logId:1
        };

        // 3) axios

        const response = await axios.post(
            'http://localhost:8080/api/board/rvwrite', // 서버 주소
            boardData, // 전송할 객체/폼
            { headers:{ Authorization : `Bearer ${token}`}}
        );

        const data = response.data;
        if(data == true){alert('리뷰가 등록되었습니다.'); location.href="/community";
        }else{
            alert('[오류] 다시 시도해주세요.');
        }
     }

   return (
    <div className="write-container">
        <div className="write-card">
            <h3 className="write-title">글쓰기 페이지</h3>
            <form onSubmit={boardWrite}>
                {/* 제목 섹션 */}
                <div className="form-group">
                    <label>제목</label>
                    <input 
                        name="boardTitle" 
                        className="input-field" 
                        placeholder="제목을 입력해주세요" 
                    />
                </div>

                {/* 내용 섹션 */}
                <div className="form-group">
                    <label>내용</label>
                    <textarea 
                        name="boardContent" 
                        className="textarea-field" 
                        placeholder="내용을 입력해주세요"
                    ></textarea>
                </div>

                {/* 버튼 섹션 */}
                <div className="write-btn-group">
                    <button type="submit" className="submit-btn">
                        등록하기
                    </button>
                </div>
            </form>
        </div>
    </div>
    );
}