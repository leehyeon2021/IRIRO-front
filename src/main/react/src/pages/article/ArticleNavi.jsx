import { Link, Route, Routes } from "react-router-dom";
import ArticleList from "./ArticleList";
import ArticleSearch from "./ArticleSearch";
import ArticleFind from "./ArticleFind";


export default function ArticleNavi( props ){
    return(<>
            <div>
                <Link to="/"> ↩️ 지도로 돌아가기 </Link>
                <Link to="/community"> 👥 이리로 커뮤니티 </Link>
            </div>
    </>)
}