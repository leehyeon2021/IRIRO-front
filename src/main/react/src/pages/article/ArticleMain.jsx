import { Route, Routes } from "react-router-dom";
import ArticleNavi from "./ArticleNavi.jsx";
import ArticleList from "./ArticleList";
import ArticleSearch from "./ArticleSearch";
import ArticleFind from "./ArticleFind";


export default function ArticleMain( props ){

    // 

    // 
    return(<>
        <ArticleNavi/>
            <Routes>
                <Route path="/articles/list" element={<ArticleList/>}/>
                <Route path="/articles/search" element={<ArticleSearch/>}/>
                <Route path="/articles/find" element={<ArticleFind/>}/>
            </Routes>
    </>)
}