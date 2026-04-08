import { Link } from "react-router-dom";
import '../../css/article/ArticleHeader.css';

export default function ArticleNavi( props ){
    return(<>
            <div className="header-sticky">
                <Link to="/"> ↩️ 지도로 돌아가기 </Link>
                <Link to="/community"> 👥 이리로 커뮤니티 </Link>
            </div>
    </>)
}