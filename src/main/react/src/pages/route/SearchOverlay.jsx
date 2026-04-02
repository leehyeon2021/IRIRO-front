import { useState } from 'react';
import '../../css/route/SearchOverlay.css';
import { searchTmapPOI } from '../../api/tmapPOI.js';

export default function SearchOverlay({ onClose }) {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (!keyword.trim()) return; // 공백을 제거해 공백만 입력했을 때는 아무것도 안 뜨게
        setIsLoading(true);
        try {
            const poiList = await searchTmapPOI(keyword); // tmapPOI.js 에 keyword 넘겨주고 result 값 받기
            setResults(poiList); // 상태 변화
        } catch (error) {
            alert("검색 중 문제가 발생했습니다.");
        } finally { //로딩 종료
            setIsLoading(false);
        }
    };

    return (
        <div className="search-screen-overlay">
            <div className="search-screen-header">
                <div className="real-search-box">

                    {/* 뒤로가기 버튼 */}
                    <button className="inner-btn" onClick={onClose}>
                        <svg width="18" height="28"
                            viewBox="0 0 24 36" fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <polyline points="16 32, 8 18, 16 4"></polyline>
                        </svg>
                    </button>

                    <input
                        type="text"
                        className="inner-input"
                        placeholder="도착지를 입력하세요"
                        autoFocus
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // 키를 입력 받음
                    />

                    <button className="inner-btn" onClick={handleSearch}>
                        🔍
                    </button>

                </div>
            </div>

            <div className="search-screen-content">
                {isLoading && <p className="empty-search-text">검색 중입니다...</p>}
                {!isLoading && results.length > 0 && (
                    <ul className="search-result-list">
                        {results.map((poi) => (
                            <li key={poi.id} className="search-result-item" onClick={() => console.log(poi.name)}> {/* 목록이 클릭되면 추후에 출발/목적지 선택, 정보 띄우기 */}
                                <div className="poi-name">{poi.name}</div>
                                <div className="poi-address">{poi.upperAddrName} {poi.middleAddrName} {poi.lowerAddrName}</div>
                            </li>
                        ))}
                    </ul>
                )}
                {!isLoading && keyword && results.length === 0 && (
                    <p className="empty-search-text">검색 결과가 없습니다.</p>
                )}
            </div>
        </div>
    );
}