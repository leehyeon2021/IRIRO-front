import { Route, Routes } from "react-router-dom";
import ArticleHeader from "./ArticleHeader.jsx";
import ArticleList from "./ArticleList";
import ArticleSearch from "./ArticleSearch";
import ArticleFind from "./ArticleFind";


export default function ArticleMain( props ){

    // 

    // 
    return(<>
        <ArticleHeader/>
            <Routes>
                <Route path="/" element={<ArticleList/>}/>
                <Route path="/search" element={<ArticleSearch/>}/>
                <Route path="/find" element={<ArticleFind/>}/>
            </Routes>
        <ArticleHeader/>
    </>)
}