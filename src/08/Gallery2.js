import GalleryCard2 from "./GalleryCard2";
import TailButton from "../UI/TailButton";
import {useEffect, useRef, useState} from "react";

export default function Gallery2() {
    const [tdata, setTdata] = useState([]);//데이터가 배열이어서 초기값도 배열로 줌
    const [cards, setCards] = useState([]);
    const inRef = useRef();

    const getFetchData = () => {
        let url = `https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1?`;
        url = `${url}serviceKey=${process.env.REACT_APP_API_KEY}`;
        url = `${url}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A`
        url = `${url}&keyword=${encodeURI(inRef.current.value)}&_type=json`//한글 인코딩
        console.log(url);

        //데이터 가져오기
        fetch(url)
        .then(resp => resp.json())
        .then(data => setTdata(data.response.body.items.item))
        .catch(err => console.error(err));
    }
    const handleOK = (e) =>{
        e.preventDefault();//폼 안의 버튼 누르면 새로고침되는 걸 막기위해

        if(inRef.current.value === ''){
            alert('키워드를 입력하세요');
            inRef.current.focus();
            return;
        }
        // getFetchData 호출
        getFetchData();

    }
    const handleClear = () =>{

    }

    useEffect(() => {
        inRef.current.focus();
    },[])

    useEffect(() => {
        let tm = tdata.map(item => <GalleryCard2
                                                    key={item.galContentId}
                                                    item={item}
        />)

        setCards(tm);
    }, [tdata]);

    return (
        <div className="w-full h-full flex flex-col justify-start items-center">
            <form className='w-10/12 h-24 flex justify-center items-center'>

            <div>
                <input
                    type='text' id='txt1' ref={inRef} autoComplete='off'
                    className='form-input rounded w-full'
                />
            </div>

            <div>
                <TailButton caption='확인'
                            bcolor='blue'
                            handleClick={handleOK}
                />

                <TailButton caption='취소'
                            bcolor='blue'
                            handleClick={handleClear}
                />
            </div>

            </form>

            <div className='w-10/12 grid grid-cols-1
                            md:grid-cols-2 lg:grid-cols-3 gap-2'>
                {cards}
            </div>
        </div>
    );
};