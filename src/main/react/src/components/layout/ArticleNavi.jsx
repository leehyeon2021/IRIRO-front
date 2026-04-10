import { Link } from "react-router-dom";
import '../../css/article/ArticleMain.css';

export default function ArticleNavi( props ){
    return(<>
            <div className="header-sticky">
                <Link className="headerNavi" to="/"> ↩️ 지도로 돌아가기 </Link>
                <Link className="headerNavi" to="/community"> 👥 이리로 커뮤니티 </Link>
            </div>
            
    </>)
}