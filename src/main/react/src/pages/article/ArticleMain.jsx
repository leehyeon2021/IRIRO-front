import { Route, Routes } from "react-router-dom";
import ArticleNavi from "../../components/layout/ArticleNavi.jsx";
import ArticleList from "./ArticleList";
import ArticleFind from "./ArticleFind";
import '../../css/article/ArticleMain.css';
import MainHeader from "../../components/layout/MainHeader.jsx";


export default function ArticleMain( props ){
    return(
        <div className="article-main-layout">
            <MainHeader/>
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