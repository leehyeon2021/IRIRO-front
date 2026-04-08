import { Route, Routes } from "react-router-dom";
import ArticleHeader from "./ArticleHeader.jsx";
import ArticleList from "./ArticleList";
import ArticleSearch from "./ArticleSearch";
import ArticleFind from "./ArticleFind";
import '../../css/article/ArticleMain.css';


export default function ArticleMain( props ){
    return(
    <div className="article-main-layout">
        <ArticleHeader/>
        <div className="article-content-area">
            <Routes>
                <Route path="/" element={<ArticleList/>}/>
                <Route path="/search" element={<ArticleSearch/>}/>
                <Route path="/find" element={<ArticleFind/>}/>
            </Routes>
            </div>
    </div>
    )
}