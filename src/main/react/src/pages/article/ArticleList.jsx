import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../../assets/logo_iriro.png'
import axios from 'axios';
import '../../css/article/ArticleList.css';

export default function ArticleList( props ){
    const [ list , setList ] = useState([]);
    const [ searchParams , setSearchParams ] = useSearchParams();
    const navigate = useNavigate();

    const currentDistrict = searchParams.get("articleDistrict") || "전체"
    
    // 불러오기
    const getArticles = async(e) => {
        if(e){e.preventDefault();}
        
        try{            
            // 전체 조회
            let url = "http://localhost:8080/api/articles/list";
            if(currentDistrict != "전체" ){
                url = `http://localhost:8080/api/articles/search?articleDistrict=${currentDistrict}`;
            }
            const response = await axios.get(url);
            setList(response.data);
        }catch(e){
            console.error("[데이터 불러오기 실패] ", e);
        }
    }

    // axios 실행 (컴포넌트 열릴 때 한 번)
    useEffect( () => {
         getArticles(); 
    } , [currentDistrict] );
    
    const onSearch = (e) => {
        e.preventDefault();
        const selected = e.target.district.value;
        setSearchParams( { articleDistrict : selected });
    }

    return (<>
            {/* 전체 컨테이너 배경*/}
            <div className="article-list-page">
                
                {/* 상단 검색바 영역 */}
                <div className='main_top'>
                    <h3 style={{ margin: "0", fontWeight: 'bold', color: '#0056b3' }}> 
                        우리 지역구 범죄 기사
                    </h3>

                    <form onSubmit={onSearch} 
                        style={{ marginTop: '5px' }}
                    >
                        <div style={{ marginBottom: '5px', fontSize: '14px' }}> 
                            ⬇️ 서울 특별시 지역구 검색 ⬇️
                        </div>
                        <select
                            name='district'
                            className="seoulDistrict"
                            defaultValue={currentDistrict}
                        >
                            <option value="전체">전체</option>
                            <option value="강남구">강남구</option>
                            <option value="강동구">강동구</option>
                            <option value="강북구">강북구</option>
                            <option value="강서구">강서구</option>
                            <option value="관악구">관악구</option>
                            <option value="광진구">광진구</option>
                            <option value="구로구">구로구</option>
                            <option value="금천구">금천구</option>
                            <option value="노원구">노원구</option>
                            <option value="도봉구">도봉구</option>
                            <option value="동대문구">동대문구</option>
                            <option value="동작구">동작구</option>
                            <option value="마포구">마포구</option>
                            <option value="서대문구">서대문구</option>
                            <option value="서초구">서초구</option>
                            <option value="성동구">성동구</option>
                            <option value="성북구">성북구</option>
                            <option value="송파구">송파구</option>
                            <option value="양천구">양천구</option>
                            <option value="영등포구">영등포구</option>
                            <option value="용산구">용산구</option>
                            <option value="은평구">은평구</option>
                            <option value="종로구">종로구</option>
                            <option value="중구">중구</option>
                            <option value="중랑구">중랑구</option>
                        </select>
                        <button type="submit">🔎</button>
                    </form>
                </div>

                {/* 기사 */}
                <div className="article-container">
                    {list.length > 0
                        ? ( list.map((article, index) => 
                            (
                                <div
                                    key={article.articleId}
                                    className="article-card"
                                    onClick={() => navigate(`/articles/find?articleId=${article.articleId}`)}
                                >
                                    {/* 왼쪽 이미지 */}
                                    <div className="article-image">
                                        <img src={article.articlePic}/>
                                    </div>

                                    {/* 중앙 내용 */}
                                    <div className="article-info">
                                        <h4 className="article-title">{article.articleTitle}</h4>
                                        <p className="article-excerpt">{article.articleContent}</p>
                                    </div>

                                    {/* 우측 상단 숫자 */}
                                    <span className="article-number">{index + 1}</span>
                                </div>
                                )
                            ))
                        :
                        (
                            <div className="find-loading">
                                <div className="find-spinner"/>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
}