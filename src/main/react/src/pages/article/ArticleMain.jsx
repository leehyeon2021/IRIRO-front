import { Link } from "react-router-dom";


export default function ArticleMain( props ){

    // 

    // 
    return(<>
        <div>
            <h3>전체 조회</h3>
            <Link to="/"> 나가기 </Link>
            <Link to="/community"> 커뮤니티 </Link>
        </div>
    </>)
}