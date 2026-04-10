import { Route, Routes } from "react-router-dom";
import ArticleNavi from "../../components/layout/ArticleNavi.jsx";
import ArticleList from "./ArticleList";
import ArticleFind from "./ArticleFind";
import '../../css/article/ArticleMain.css';


export default function ArticleMain( props ){
    return(
        <div className="article-main-layout">
            <div className="article-content-area">
                <Routes>
                    <Route path="/" element={<ArticleList/>}/>
                    <Route path="/find" element={<ArticleFind/>}/>
                </Routes>
                </div>
                <ArticleNavi/>
        </div>
    )
}