import {useEffect, useRef, useState} from "react";
import TailButton from "../UI/TailButton";
import axios from "axios";

export default function Rest() {
    const [tdata, setTdata] = useState([]);
    // const [tags, setTags] = useState();

    const txt1Ref = useRef();//현재 참조요소 값변경, 포커스 등
    const txt2Ref = useRef();

    //수정
    const [isUpdate, setIsUpdate] = useState(false);
    const[isUpdateId, setIsUpdateId] = useState();

    //페이징
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(1);


    //1. json데이터 가져오기
    const url = 'http://localhost:5000/posts';

    const getFetchData = async (page = 1) => {
        try {
            const response = await axios.get(url);

            console.log("응답 데이터 구조 확인:", response.data); // 데이터 구조 확인

            // 전체 데이터를 가져온 후 `reverse()`로 최신 데이터가 맨 위로!
            const sortedData = response.data.reverse();

            // 전체 데이터 개수 가져오기
            const total = sortedData.length;

            // 페이지 개수 계산
            setTotalPages(Math.ceil(total / 5)); //올림해서 가장 가까운 정수

            // 페이지별 데이터 나누기 (페이지네이션 적용)
            const startIndex = (page - 1) * 5;//page:현재 페이지 번호, 5:한 페이지에 보여줄 데이터 개수

            const paginatedData = sortedData.slice(startIndex, startIndex + 5);//slice(시작 인덱스, 끝 인덱스)
                                                                                //startIndex:현재 페이지의 시작
                                                                                //startIndex + 5:현재 페이지에서 5개 가져옴

            setTdata(paginatedData);

        } catch (error) {
            console.error("데이터 불러오기 실패", error);
            setTdata([]);
        }
    };


    //페이지 이동버튼 추가
        //이전페이지
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);//prev는 현재 currentPage 값을 의미해.
    };

        //다음페이지
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);//prev는 현재 currentPage 값, 업데이트된 값
    };

    //현재페이지 변경될 때 데이터 다시 불러오기
    useEffect( () => {
        getFetchData(currentPage);

    },[currentPage]);


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

        // 최신 데이터 맨 앞에 추가하고, 최대 5개까지만 유지
        setTdata(prevData => [data, ...prevData].slice(0, 5));

        txt1Ref.current.value = '';
        txt2Ref.current.value = '';

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
        setIsUpdate('null');
    }


    const handleOk = () =>{
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
                            handleClick={handleOk}
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
                    {tdata.map(item =>
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
                                            handleClick={()=>handleUpdate(item)}
                                />
                            </td>
                        </tr>
                        )
                    }
                </tbody>
            </table>

            <div className="flex justify-center mt-4">
                <TailButton caption="이전" bcolor="blue" handleClick={handlePrevPage} disabled={currentPage === 1}/>
                <span className="mx-4 text-lg"> {currentPage} / {totalPages} </span>
                <TailButton caption="다음" bcolor="blue" handleClick={handleNextPage}
                            disabled={currentPage === totalPages}/>
            </div>


        </div>
    );
};