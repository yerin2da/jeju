import {useEffect, useRef, useState} from "react";
import axios from "axios";
import TailButton from "../../UI/TailButton";
import {LuCirclePlus} from "react-icons/lu";
import CountrySelTab from "../../components/CountrySelTab";
import CountrySelOption from "../../components/CountrySelOption";


const url = 'http://localhost:5000/posts';

export default function WalletMyCoin() {
    const [tdata, setTdata] = useState([]);
    const [register, setRegister] = useState(true);//동전등록 버튼

    const handleRegister = () => {
        setRegister(false);
    };

    const txt1Ref = useRef();//현재 참조요소 값변경, 포커스 등
    const txt2Ref = useRef();

    //수정
    const [isUpdate, setIsUpdate] = useState(false);
    const[isUpdateId, setIsUpdateId] = useState();

    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                console.log("거래내역 응답 리스트:", response.data);

                setTdata(response.data); // 바로 배열을 저장
            } catch (error) {
                console.error("API 요청 에러:", error);
                setTdata([]);
            }
        };

        fetchData();
    }, []);


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

        const {data} = await axios.post(url, postData)

        // 최신 데이터 추가
        setTdata(prevData => [...prevData, data]);

        if (txt1Ref.current) txt1Ref.current.value = '';
        if (txt2Ref.current) txt2Ref.current.value = '';

    }

    const jsonDelete = async (id) => {

        await axios.delete(`${url}/${id}`);
        setTdata(tdata.filter(item => item.id !== id));

        txt1Ref.current.value = '';
        txt2Ref.current.value = '';

    }

    const handleUpdate = async (item) => {
        txt1Ref.current.value = item.title;
        txt2Ref.current.value = item.author;

        setIsUpdate(true);
        setIsUpdateId(item.id);
        setRegister(false);

    }

    const jsonPut = async () => {
        const putData ={
            id: isUpdateId,
            title : txt1Ref.current.value,
            author: txt2Ref.current.value,
        }

        const {data} = await axios.put(`${url}/${isUpdateId}`, putData);

        setTdata(tdata.map(item => item.id === isUpdateId ? data : item));

        txt1Ref.current.value = '';
        txt1Ref.current.focus();
        txt2Ref.current.value = '';

        setIsUpdate(false);
    }


    const handleOk = () =>{
        if(isUpdate){
            jsonPut();
            setRegister(true);

        }
        else {
            jsonPost();
            setRegister(true);

        }
    }

    return (
        <div className="p-5">
            {register ? (
                <div
                    className="dotBorder border-subColor2 !flex-col gap-1 cursor-pointer text-subColor2"
                    onClick={handleRegister}
                >
                    <LuCirclePlus/> 동전 등록하기
                </div>
            ) : (
                <div className={``}>
                    <CountrySelOption />


                </div>
            )}
            {/*<TailButton caption={isUpdate ? '저장' : '입력'}*/}
            {/*            bcolor={`blue`}*/}
            {/*            handleClick={handleOk}*/}
            {/*/>*/}
            {/*<table className={`w-full bg-gray-200`}>*/}
            {/*    <thead className={`w-full bg-gray-600 text-white`}>*/}
            {/*    <tr>*/}
            {/*        <th scope={`col`} className={`py-3 px-4 border-b`}>제목</th>*/}
            {/*        <th scope={`col`} className={`py-3 px-4 border-b`}>작성자</th>*/}
            {/*        <th scope={`col`} className={`py-3 px-4 border-b`}>삭제</th>*/}
            {/*        <th scope={`col`} className={`py-3 px-4 border-b`}>편집</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody className={`w-full`}>*/}
            {/*    {tdata.map((item) => (*/}
            {/*        <tr key={item.id} className={`h-10 text-center`}>*/}
            {/*            <td className={`py-3 px-4 border-b`}>{item.title}</td>*/}
            {/*            <td className={`py-3 px-4 border-b`}>{item.author}</td>*/}
            {/*            <td>*/}
            {/*                <TailButton caption={`삭제`}*/}
            {/*                            bcolor={`orange`}*/}
            {/*                            handleClick={() => jsonDelete(item.id)}*/}
            {/*                />*/}
            {/*            </td>*/}
            {/*            <td>*/}
            {/*                <TailButton caption={`수정`}*/}
            {/*                            bcolor={`mainColor`}*/}
            {/*                            handleClick={() => handleUpdate(item)}*/}
            {/*                />*/}
            {/*            </td>*/}
            {/*        </tr>*/}
            {/*    ))}*/}
            {/*    </tbody>*/}
            {/*</table>*/}


        </div>
    );
};