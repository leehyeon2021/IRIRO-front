import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/article/ArticleFind.css';

export default function ArticleFind() {
    const [article, setArticle] = useState(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const articleId = searchParams.get("articleId");

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/articles/find?articleId=${articleId}`
                );
                setArticle(response.data);
            } catch (e) {
                console.error("[기사 불러오기 실패] ", e);
            }
        };
        if (articleId) fetchArticle();
    }, [articleId]);

    // 로딩...
    if (!article) return (
        <div className="find-loading">
            <div className="find-spinner"/>
        </div>
    );

    return (
        <div className="find-page">

            {/* 뒤로가기 */}
            <button className="find-back-btn" onClick={() => navigate(-1)}>
                ↩️ 목록으로 돌아가기
            </button>

            {/* 기사 본문 박스 */}
            <div className="find-card">

                {/* 제목 */}
                <h2 className="find-title">{article.articleTitle}</h2>

                {/* 메타 정보 */}
                <div className="find-meta">
                    <span className="find-badge">{article.articleSite}</span>
                    <span className="find-meta-text">{article.articleWriter} 기자</span>
                    <span className="find-meta-divider">|</span>
                    <span className="find-meta-text">{article.articleDate}</span>
                    <span className="find-meta-divider">|</span>
                    <span className="find-meta-text">{article.articleDistrict} 기사</span>
                </div>
                <div className='find-container'>
                    {/* 이미지 */}
                    {article.articlePic && (
                        <div className="find-image-wrap">
                            <img src={article.articlePic} alt={article.articleTitle} className="find-image"/>
                        </div>
                    )}

                    {/* 본문 */}
                    <div className="find-content">
                        <p>{article.articleContent}</p>
                    </div>

                    {/* 원문 링크 */}
                    {article.articleUrl && (
                        <a
                            href={article.articleUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="find-link"
                        >
                            📰 기사 보러 가기 →
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}