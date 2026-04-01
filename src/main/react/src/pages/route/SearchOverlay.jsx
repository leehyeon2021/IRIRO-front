import { useState } from 'react';
import '../../css/route/SearchOverlay.css';
import { searchTmapPOI } from '../../api/tmapPOI.js';

export default function SearchOverlay({ onClose }) {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (!keyword.trim()) return;
        setIsLoading(true);
        try {
            const poiList = await searchTmapPOI(keyword);
            setResults(poiList);
        } catch (error) {
            alert("검색 중 문제가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="search-screen-overlay">

            {/* ⭐ 상단 헤더 영역 (여기 구조가 바뀝니다!) ⭐ */}
            <div className="search-screen-header">

                {/* ⭐ 이게 진짜 화면에 보이는 '하나의 둥근 검색창' 역할 ⭐ */}
                <div className="real-search-box">

                    {/* 1. 검색창 안 왼쪽: 뒤로 가기 버튼 */}
                    <button className="inner-btn" onClick={onClose}>
                        <svg width="18" height="28" viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 32, 8 18, 16 4"></polyline>
                        </svg>
                    </button>

                    {/* 2. 검색창 안 중앙: 투명한 입력칸 */}
                    <input
                        type="text"
                        className="inner-input"
                        placeholder="도착지를 입력하세요"
                        autoFocus
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />

                    {/* 3. 검색창 안 오른쪽: 검색 돋보기 버튼 */}
                    <button className="inner-btn" onClick={handleSearch}>
                        🔍
                    </button>

                </div>
            </div>

            <div className="search-screen-content">
                {/* ... 결과 리스트 코드는 동일 ... */}
                {isLoading && <p className="empty-search-text">검색 중입니다...</p>}
                {!isLoading && results.length > 0 && (
                    <ul className="search-result-list">
                        {results.map((poi) => (
                            <li key={poi.id} className="search-result-item" onClick={() => console.log(poi.name)}>
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