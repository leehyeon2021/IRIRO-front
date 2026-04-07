import { useEffect, useState } from 'react';
import logo from '../../assets/logo_iriro.png'
import ArticleSearch from "./ArticleSearch.jsx";
import { useNavigate } from 'react-router-dom';

export default function ArticleList( props ){

    const navigate = useNavigate();

    // 1. axios 서버로 부터 게시물을 저장하는 상태변수
    const [ list , setList ] = useState([]);

    // [폼 제출할 상태변수]
    const [ selectDistrict , setSelectDistrict] = useState("전체");

    // [ 폼 제출 ]
    const district = async(e) => {
        e.preventDefault();
        navigate(`/articles/search?district=${selectDistrict}`);
    }

    // 2. axios통신 (전체조회)
    const getArticleFindAll = async() => {
        try{
            const response = await axios.get("http://localhost:8080/api/articles/list");
            const data = response.data;
            setList( data );
        }catch(e){console.log(e)}
    }

    // 3. axios 실행 (컴포넌트 열릴 때 한 번)
    useEffect( () => { getArticleFindAll(); } , [] );
    

    return(<>
        <div>
            <div className='main_top'>
                <div>
                    <img src={logo} name={logo}/>
                    <div> 우리 지역구 안전/범죄 기사 </div>
                </div>
                <form onSubmit={district}>
                    <div> 서울 특별시 지역구 검색 ➡️ </div>
                    <select 
                        className="seoulDistrict"
                        value={setSelectDistrict}
                    >
                        <option>전체</option>
                        <option>강남구</option>
                        <option>강동구</option>
                        <option>강북구</option>
                        <option>강서구</option>
                        <option>관악구</option>
                        <option>광진구</option>
                        <option>구로구</option>
                        <option>금천구</option>
                        <option>노원구</option>
                        <option>도봉구</option>
                        <option>동대문구</option>
                        <option>동작구</option>
                        <option>마포구</option>
                        <option>서대문구</option>
                        <option>서초구</option>
                        <option>성동구</option>
                        <option>성북구</option>
                        <option>송파구</option>
                        <option>양천구</option>
                        <option>영등포구</option>
                        <option>용산구</option>
                        <option>은평구</option>
                        <option>종로구</option>
                        <option>중구</option>
                        <option>중랑구</option>
                    </select>
                    <button type="submit">🔎</button>
                </form>
            </div>
            <div className='main_list'>
                <table>
                    <tbody>
                        {
                            list.map( articles => {
                                <tr>
                                    <td></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>)
}