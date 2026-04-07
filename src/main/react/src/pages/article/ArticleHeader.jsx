import { Link, Route, Routes } from "react-router-dom";


export default function ArticleNavi( props ){
    return(<>
            <div>
                <Link to="/"> ↩️ 지도로 돌아가기 </Link>
                <Link to="/community"> 👥 이리로 커뮤니티 </Link>
            </div>
    </>)
}