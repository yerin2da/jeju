import {useState, useEffect} from 'react'
import TrafficNav from "./TrafficNav";
//패치(fetch)는
// 서버(API)에서 데이터를 가져오기 위해 사용
// 웹사이트가 실시간으로 외부 데이터를 받아와서 화면을 업데이트하는 데 필요한 기능
// fetch를 쓰면 사용자가 새로고침하지 않아도 최신 정보를 보여줄 수 있음
// 비동기

export default function Traffic() {
    //전체 fetch데이터
    const [tdata, setTdata] = useState();

    //대분류 만들기
    const [c1, setC1] = useState();

    //선택된 대분류
    const[selC1, setSelC1] = useState();

    //중분류 만들기
    const [c2, setC2] = useState();

    //선택된 중분류
    const[selC2, setSelC2] = useState();

    //상세정보
    const [info, setInfo] = useState();

    const getFetchData=()=>{
        let url = `https://api.odcloud.kr/api/15070282/v1/uddi:8449c5d7-8be5-4712-9093-968fc0b2d9fc?`
            url = `${url}page=1&perPage=10&serviceKey=${process.env.REACT_APP_API_KEY}`
        console.log(url);

        //데이터가져오기
        fetch(url)// Promise를 반환함 (Pending 상태)
            .then(resp =>resp.json())//정상호출//성공 시 JSON으로 변환
            .then(data => setTdata(data.data))// 변환된 데이터 처리
            .catch(err => console.error(err));// 실패 시 오류 처리
    }
    //컴포넌트 생성시 fetch 하기
    useEffect( ()=>{
        getFetchData();
    },[]);

    //tdata 변경되었을 때 실행하기
    useEffect(() => {
        if(!tdata) return;

        //대분류 만들기
        let tm = tdata.map(item => item['사고유형대분류']);
        tm = [... new Set(tm)]//뉴셋하면서 대분류 중복된것 없애줌
        setC1(tm);
        console.log(`tm:`,tm);
        console.log(`td:`,tdata);
    }, [tdata]);

    //중분류 만들기
    useEffect(()=>{
        if(!tdata || !c1 || !selC1) return;

        let tm = tdata.filter(item => item['사고유형대분류'] === selC1)
            .map(item => item['사고유형중분류']);

        setC2(tm);
    },[selC1]);


    // 상세정보 만들기
    useEffect(() => {
        if(!selC2) return;

        let tm = tdata.filter(item => item['사고유형대분류'] === selC1 &&
                                        item['사고유형중분류'] === selC2)[0];
        const infoKey =['사고건수','사망자수'];
        tm = infoKey.map(item => <div key={item}>
                                            <div>
                                                {item}
                                            </div>
                                            <div>
                                                {parseInt(tm[item]).toLocaleString()}
                                                {/*
                                                    parseInt()정수형 숫자로 변환.
                                                    .toLocaleString()천 단위 콤마(,)가 들어간 형식으로 변환
                                                */}

                                                {/* <div>{tm['사망자수']}</div>
                                                    tm['사망자수']는 5*

                                                        자바스크립트에서 객체의 값을 가져오는 방법은 두 가지가 있음.

                                                        ✅ 점 표기법(dot notation)
                                                        tm.사망자수 // 5
                                                        키 이름이 영문, 숫자, _ 만 포함되어 있으면 가능.
                                                        하지만 한글 키(사망자수)는 점 표기법으로 접근 불가능.

                                                        ✅ 대괄호 표기법(bracket notation)
                                                        tm['사망자수'] // 5
                                                        문자열 키를 사용할 수 있음.
                                                        위처럼 한글 키가 있는 경우 반드시 대괄호 표기법을 사용해야 함.
                                                        */}
                                            </div>
                                        </div>)
        setInfo(tm)
        }, [selC2])
    return (
        <div className={`w-full h-full flex flex-col justify-start items-center`}>
            {c1 &&  <TrafficNav
                title = "대분류"
                c={c1}
                sel={selC1}
                setSel={setSelC1}
            />}

            {c2 &&  <TrafficNav
                title = "중분류"
                c={c2}
                sel={selC2}
                setSel={setSelC2}
            />}

            <div className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`}>
                {info}
            </div>
        </div>
    );
};