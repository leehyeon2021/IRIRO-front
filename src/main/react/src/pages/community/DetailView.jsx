import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../css/community/DetailView.css";

export default function DetailView(props) {
    // [1] 변수 선언을 가장 최상단으로 올립니다 (에러 해결 핵심!)
    const { boardId } = useParams();

    // [2] 상태 변수들 선언
    const [post, setPost] = useState(null);
    const [replyList, setReplyList] = useState([]); // 이 선언이 빠졌다면 추가하세요!


    // 주소 변환 함수
    const getAddress = async(x,y)=>{
        try{
            const res = await axios.get(`http://localhost:8080/api/test-address?x=${x}&y=${y}`);
            return res.data.documents[0].address.address_name;
        }catch(err){
            console.error("주소 변환 에러 : " , err);
            return " 주소 변환 실패 ";
        }
    }
    // [3] 이제 boardId를 사용하는 함수들을 정의합니다.
    // 게시물 상세 가져오기
    const findById = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/board/detail?boardId=${boardId}`);
            
            // 서버에서 받은 데이터를 일단 변수에 담기
            const postData = response.data;

            // 주소 변환
            const addr = await getAddress(postData.startLongitude, postData.startLatitude);

            // 주소까지 합쳐서 한꺼번에 저장
            setPost({...postData,addressName:addr});
        } catch (e) { console.log("게시물 로드 실패:", e); }
    };

    // 댓글 목록 가져오기
    const getReplyList = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/board/rplist?boardId=${boardId}`);
            setReplyList(res.data);
        } catch (err) { console.log("댓글 로드 실패:", err); }
    };

    // 댓글 작성
    const replyWrite = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const replyContent = e.target.replyContent.value;
            const replyData = { replyContent, boardId };

            const response = await axios.post('http://localhost:8080/api/board/rp', replyData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data === true) {
                alert('댓글이 등록되었습니다.');
                e.target.replyContent.value = "";
                getReplyList(); // 댓글 목록 갱신
            }
        } catch (e) { console.error('댓글 등록 실패:', e); }
    };

    const navigate = useNavigate();

    // 따봉(추천) 기능
    const ddabong = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/board/ddabong?boardId=${boardId}`);
            if (response.status === 200) {
                alert('따봉 성공!');
                findById(); // 데이터 갱신
            }
        } catch (e) { console.error("따봉 실패:", e); }
    };

    const deleteReply=(id)=>{
        if(window.confirm('댓글을 정말 삭제하시겠습니까?')){
            const token = localStorage.getItem('token');

            axios.delete(`http://localhost:8080/api/board/rpdelete`,
                {
                    params:{replyId:id},
                    headers:{Authorization:`Bearer ${token}`}
                }
            )

            .then(res=>{
                if(res.data === true){
                    alert('삭제가 완료되었습니다.');
                    getReplyList();
                }else{
                    alert('삭제 권한이 없습니다.(본인 댓글만 삭제 가능)');
                }
            })
            .catch(err => {
                console.error(err);
                alert('서버와 통신 중 오류가 발생했습니다.');
            });
        }
    }

    const deletePost=()=>{
        console.log('1.삭제 버튼 클릭됨')
        if(window.confirm('리뷰를 정말 삭제하시겠습니까?')){
            const token = localStorage.getItem('token');
            console.log('확인 창에서 확인 누름');
            axios.delete(`http://localhost:8080/api/board/rvdelete`,
                {
                    params:{boardId:boardId},
                    headers:{Authorization:`Bearer ${token}`}
                }
            )
            .then(res=>{
                if(res.data === true){
                alert("삭제가 완료되었습니다.");
                navigate("/community");
            }else{
                alert('삭제 권한이 없습니다.(본인 게시글만 삭제 가능)');
            }
            })
            .catch(err=>{
                alert("삭제 실패");
                console.error(err);
            });
        }
    };




    // [4] 실행 시점 제어
    useEffect(() => {
        if (boardId) {
            findById();
            getReplyList();
        }
    }, [boardId]);

    // [5] 데이터 로딩 체크 (Early Return)
    // 주의: 모든 훅(useState, useEffect)은 이 리턴문보다 위에 있어야 합니다!
    if (!post) return <div> 불러오는 중... </div>

   // [6] 실제 화면 렌더링
    return (
        <div className="detail-container">
            {/* 메인 게시글 카드 */}
            <div className="post-main-card">
                <div className="post-header">
                    <div className="post-meta-top">
                        <span>작성자 : <strong>{post.nickname}</strong> | 작성일 : {post.createdAt}</span>
                        <button className="delete-btn-text" onClick={deletePost}>삭제</button>
                    </div>
                    <div className="post-location">📍 위치 : {post.addressName || " 주소값 로딩 중 . . . "}</div>
                    <h2 className="post-title">{post.boardTitle}</h2>
                </div>

                <div className="post-body">
                    {post.boardContent}
                </div>

                <div className="post-footer">
                    <div style={{marginBottom: '10px', color: '#666'}}>👍 따봉 : {post.recommendCount}</div>
                    <button className="ddabong-btn" onClick={ddabong}> 따봉하기👍🏻 </button>
                </div>
            </div>

            {/* 댓글 영역 */}
            <div className="reply-section">
                <h4 className="reply-count">댓글 목록</h4>
                
                {/* 댓글 입력 폼 */}
                <form className="reply-form" onSubmit={replyWrite}>
                    <input 
                        className="reply-input" 
                        name="replyContent" 
                        placeholder="댓글을 입력해주세요." 
                    />
                    <button className="reply-submit-btn" type="submit">등록</button>
                </form>

                {/* 댓글 출력 목록 */}
                <div className="reply-list">
                    {replyList && replyList.map((reply) => (
                        <div key={reply.replyId} className="reply-item">
                            <div className="reply-user-info">
                                <span>작성자 : {reply.nickname}</span>
                                <span className="reply-delete-btn" onClick={ () => deleteReply(reply.replyId) }>삭제</span>
                            </div>
                            <div className="reply-text">{reply.replyContent}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}