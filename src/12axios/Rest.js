import {useEffect, useRef, useState} from "react";
import TailButton from "../UI/TailButton";
import axios from "axios";

export default function Rest() {
    const [tdata, setTdata] = useState([]);
    const [tags, setTags] = useState();

    const txt1Ref = useRef();//현재 참조요소 값변경, 포커스 등
    const txt2Ref = useRef();

    const [isUpdate, setIsUpdate] = useState(false);
    const[isUpdateId, setIsUpdateId] = useState();

    //1. json데이터 가져오기
    const url = 'http://localhost:3005/posts';//데이터 받아올 주소
    const  getFetchData = async () => {//async:비동기 작업처리
        /*
         const response = await fetch(url);// await:비동기 함수에서 "이 작업이 끝날 때까지 기다려!" 라고 하기 위해!
                                                             //아직 데이터를 가져오지도 않았는데 Promise가 실행될수도 있음
         const data = await response.json();//json으로부터 받은 데이터
       */

        const {data} = await axios.get(url)

        setTdata(data);
    }
    useEffect( () => {
        getFetchData();
    },[]);


    //tdata가 변경될 때마다 실행되는 useEffect
    useEffect(() => {
        //데이터(tdata)가 변경될 때 이를 확인하고, 테이블 행(<tr>) 요소를 생성
        console.log(tdata);
        //item = tdata[0]
        // ===
        // { id: 1, title: "첫 번째 게시물", author: "홍길동" }

        let tm = tdata.map(item =>
            <tr key={item.id} className={`h-10 text-center`}>
                <td className={`py-3 px-4 border-b`}>{item.title}</td>
                <td className={`py-3 px-4 border-b`}>{item.author}</td>
                <td>
                    <TailButton caption={`삭제`}
                                bcolor={`orange`}
                                handleClick={() => jsonDelete(item.id)}
                    />
                </td>
                <td>
                    <TailButton caption={`수정`}
                                bcolor={`mainColor`}
                                handleClick={()=>handelUpdate(item)}
                    />
                </td>
            </tr>
        )

        setTags(tm);
    }, [tdata]);

    //2. json으로 데이터 넘겨주기
    const jsonPost = async () => {
        if(txt1Ref.current.value === ''){
            alert('제목 입력하세요');
            txt1Ref.current.focus();
            return;
        }
        if(txt2Ref.current.value === ''){
            alert('작성자 입력하세요');
            return;
        }

        const postData = {
            title : txt1Ref.current.value,
            author : txt2Ref.current.value,
        }

        /*
        const response = await fetch(url, {
            method: 'POST',
            headers : {'Content-type': 'application/json'},
            body : JSON.stringify(postData),//stringify:json을 문자형태로 만들때
        });
        const data = await response.json();//json으로부터 받은 데이터
        console.log(data);
         */

        const {data} = axios.post(url, postData)

        setTdata([data, ...tdata]);//data : 새로운 데이터 (객체)
        // 기존의 tdata 배열 앞에 data를 추가하는 코드: 최신순

        txt1Ref.current.value = '';
        txt2Ref.current.value = '';

    }

    const jsonDelete = async (id) => {
        /*
            await fetch(`${url}/${id}`,{
                method: 'DELETE',
            });
         */

        await axios.delete(`${url}/${id}`);
        setTdata(tdata.filter(item => item.id !== id));

        txt1Ref.current.value = '';
        txt2Ref.current.value = '';

    }

    const handelUpdate = async (item) => {
        txt1Ref.current.value = item.title;
        txt2Ref.current.value = item.author;

        setIsUpdate(true);
        setIsUpdateId(item.id);
    }
    const jsonPut = async () => {
        const putData ={
            id: isUpdateId,
            title : txt1Ref.current.value,
            author: txt2Ref.current.value,
        }

        /*
            const response = await fetch(`${url}/${isUpdateId}`, {
                method : 'PUT',
                headers : {'Content-type': 'application/json'},
                body : JSON.stringify(putData),
            });
            const data = await response.json();
         */

        const {data} = axios.put(`${url}/${isUpdateId}`, putData);

        setTdata(tdata.map(item => item.id === isUpdateId ? data : item));

        txt1Ref.current.value = '';
        txt1Ref.current.focus();
        txt2Ref.current.value = '';

        setIsUpdate(false);
        setIsUpdate('');
    }


    const handelOk = () =>{
        if(isUpdate){
            jsonPut();
        }
        else {
            jsonPost();
        }
    }


    return (
        <div>
            <div className={`w-full h-full flex justify-between gap-10 items-center`}>
                <div>
                    <label htmlFor="txt1" className="my-2">제목</label>
                </div>

                <div>
                    <input
                        id="txt1"
                        type="text"
                        className="form-input"
                        ref={txt1Ref}
                    />
                </div>

                <div>
                    <label htmlFor="txt2" className="my-2">작성자</label>
                </div>

                <div>
                    <input
                        id="txt2"
                        type="text"
                        className="form-input"
                        ref={txt2Ref}
                    />
                </div>

                <TailButton caption={isUpdate ? '저장' : '입력'}
                            bcolor={`blue`}
                            handleClick={handelOk }
                />
            </div>

            <table className={`w-full bg-gray-200`}>
                <thead className={`w-full bg-gray-600 text-white`}>
                <tr>
                    <th scope={`col`} className={`py-3 px-4 border-b`}>제목</th>
                    <th scope={`col`} className={`py-3 px-4 border-b`}>작성자</th>
                    <th scope={`col`} className={`py-3 px-4 border-b`}>삭제</th>
                    <th scope={`col`} className={`py-3 px-4 border-b`}>편집</th>
                </tr>
                </thead>
                <tbody className={`w-full`}>
                {tags}
                </tbody>
            </table>


        </div>
    );
};