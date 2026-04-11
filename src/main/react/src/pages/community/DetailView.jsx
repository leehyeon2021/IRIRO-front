import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


export default function DetailView(props) {
    // [1] 변수 선언을 가장 최상단으로 올립니다 (에러 해결 핵심!)
    const [params] = useSearchParams();
    const boardId = params.get("boardId");

    // [2] 상태 변수들 선언
    const [post, setPost] = useState(null);
    const [replyList, setReplyList] = useState([]); // 이 선언이 빠졌다면 추가하세요!

    // [3] 이제 boardId를 사용하는 함수들을 정의합니다.
    // 게시물 상세 가져오기
    const findById = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/board/detail?boardId=${boardId}`);
            setPost(response.data);
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
        <div>
            <h3> 게시물 상세 </h3>
            <div style={{borderBottom: '1px solid #ccc', paddingBottom: '10px'}}>
                <div> 작성자 : {post.nickname} | 작성일 : {post.createdAt} </div>
                <div> 제목 : {post.boardTitle} </div>
                <div> 내용 : {post.boardContent} </div>
                <div> 따봉 : {post.recommendCount} </div>
                <button onClick={ddabong}> 따봉하기👍🏻 </button>
            </div>

            {/* 댓글 입력 폼 */}
            <div style={{marginTop: '20px'}}>
                <form onSubmit={replyWrite}>
                    댓글 내용 : <input name="replyContent" placeholder="댓글을 입력해주세요." />
                    <button type="submit">등록</button>
                </form>
            </div>

            {/* 댓글 출력 목록 */}
            <div style={{marginTop: '20px'}}>
                <h4>댓글 목록</h4>
                {replyList && replyList.map((reply) => (
                    <div key={reply.replyId} style={{borderBottom: '1px solid #eee', padding: '5px'}}>
                        <div style={{fontWeight: 'bold'}}>작성자 : {reply.nickname}</div>
                        <div>{reply.replyContent}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}