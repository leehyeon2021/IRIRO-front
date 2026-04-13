import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../css/community/MyInfo.css";

export default function MyInfo() {
    const navigate = useNavigate();
    const [mylist, setMyList] = useState({ myBoards: [], myReplies: [] });
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get("http://localhost:8080/api/user/myinfo", {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
            setMyList(res.data);
        })
        .catch(err => console.log("에러 발생:", err));
    }, [token]);

    const clickDetail = (boardId) => {
        navigate(`/community/DetailView/${boardId}`);
    }

    return (
        <div className="mypage-container">
            <div className="mypage-header">
                <h2>마이페이지</h2>
                <Link to="/community" className="back-link">← 뒤로가기</Link>
            </div>

            {/* 내가 작성한 게시글 섹션 */}
            <span className="section-title">📝 내가 쓴 게시글</span>
            <div className="activity-list">
                {mylist?.myBoards && mylist.myBoards.length > 0 ? (
                    mylist.myBoards.map((item) => (
                        <div key={item.boardId} className="my-activity-card" onClick={() => clickDetail(item.boardId)}>
                            <div className="card-info">
                                <span>글번호: {item.boardId}</span>
                                <span>{item.createdAt?.split('T')[0]}</span>
                            </div>
                            <div className="card-title">{item.boardTitle}</div>
                        </div>
                    ))
                ) : (
                    <div className="empty-msg">작성한 게시글이 없습니다.</div>
                )}
            </div>

            {/* 내가 작성한 댓글 섹션 */}
            <span className="section-title">💬 내가 쓴 댓글</span>
            <div className="activity-list">
                {mylist?.myReplies && mylist.myReplies.length > 0 ? (
                    mylist.myReplies.map((reply) => (
                        <div key={reply.replyId} className="my-activity-card" onClick={() => clickDetail(reply.boardId)}>
                            <div className="card-info">
                                <span>게시글 번호: {reply.boardId}</span>
                                <span>{reply.createdAt?.split('T')[0]}</span>
                            </div>
                            <div className="card-content">{reply.replyContent}</div>
                        </div>
                    ))
                ) : (
                    <div className="empty-msg">작성한 댓글이 없습니다.</div>
                )}
            </div>
        </div>
    );
}