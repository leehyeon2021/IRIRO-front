import { Link, Route, Routes } from "react-router-dom";
import ArticleList from "./ArticleList";
import ArticleSearch from "./ArticleSearch";
import ArticleFind from "./ArticleFind";


export default function ArticleMain( props ){

    // 

    // 
    return(<>
        <div>
            <h3>전체 조회</h3>
            <Link to="/"> 나가기 </Link>
            <Link to="/community"> 커뮤니티 </Link>
            <Routes>
                <Route path="/articles/list" element={<ArticleList/>}/>
                <Route path="/articles/search" element={<ArticleSearch/>}/>
                <Route path="/articles/find" element={<ArticleFind/>}/>
            </Routes>
        </div>
    </>)
}