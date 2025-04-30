import React, {useEffect, useRef, useState} from "react";
import TailButton from "../UI/TailButton";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";


export default function Comment({ postId }) {
    const [tdata, setTdata] = useState([]);
    // const [tags, setTags] = useState();

    const txt1Ref = useRef();//현재 참조요소 값변경, 포커스 등
    // const txt2Ref = useRef();

    //수정
    const [isUpdate, setIsUpdate] = useState(false);
    const[isUpdateId, setIsUpdateId] = useState();

    //페이징
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(1);


    //1. json데이터 가져오기
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/comments`;
    // const url = '/comments';
    const getFetchData = async (page = 1) => {
        try {
            const response = await axios.get(url,{
                params: { postId }
            });

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
    useEffect(() => {
        if (postId) {
            getFetchData(currentPage);
        }
    }, [currentPage, postId]); // 👑 postId가 바뀌면 댓글 다시!



    //2. json으로 데이터 넘겨주기
    const jsonPost = async () => {
        if(txt1Ref.current.value === ''){
            alert('제목 입력하세요');
            txt1Ref.current.focus();
            return;
        }
        // if(txt2Ref.current.value === ''){
        //     alert('작성자 입력하세요');
        //     return;
        // }

        const postData = {
            title : txt1Ref.current.value,
            // author : txt2Ref.current.value,
            postId: postId
        }

        const {data} = await axios.post(url, postData)

        // 최신 데이터 맨 앞에 추가하고, 최대 5개까지만 유지
        setTdata(prevData => [data, ...prevData].slice(0, 5));

        txt1Ref.current.value = '';
        // txt2Ref.current.value = '';

    }

    const jsonDelete = async (id) => {

        await axios.delete(`${url}/${id}`);
        setTdata(tdata.filter(item => item.id !== id));

        txt1Ref.current.value = '';
        // txt2Ref.current.value = '';


    }

    const handleUpdate = async (item) => {
        txt1Ref.current.value = item.title;
        // txt2Ref.current.value = item.author;

        setIsUpdate(true);
        setIsUpdateId(item.id);
    }
    const jsonPut = async () => {
        const putData ={
            id: isUpdateId,
            title : txt1Ref.current.value,
            // author: txt2Ref.current.value,
            postId: postId
        }

        const {data} = await axios.put(`${url}/${isUpdateId}`, putData);

        setTdata(tdata.map(item => item.id === isUpdateId ? data : item));

        txt1Ref.current.value = '';
        txt1Ref.current.focus();
        // txt2Ref.current.value = '';

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


    const [showOptionsId, setShowOptionsId] = useState(null);//도트 누르면 수정, 삭제 버튼 보이게

    const toggleOptions = (id) => {
        setShowOptionsId(prevId => (prevId === id ? null : id));//같은 ID 클릭 → 숨김 (null), 다른 ID 클릭 → 해당 ID로 전환!
    };

    return (
        <div className={``}>

            <div className={`w-full pb-4`}>
                <div>
                    <label htmlFor="txt1" className="hidden">내용</label>
                </div>

                <div className="relative">
                    <input
                        id="txt1"
                        type="text"
                        className="w-full h-12 bg-gray-100 rounded-full pr-12 !border-0"
                        ref={txt1Ref}
                        placeholder="댓글을 입력해주세요gg"
                    />

                    <TailButton
                        caption={<IoMdSend className="w-5 h-5 text-white"/>}
                        handleClick={handleOk}
                        className="w-10 h-10 bg-mainColor rounded-full flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2"
                    />
                </div>
            </div>

            <div className={`font-bold text-base pb-2`}>댓글 {tdata.length}</div>

            <ul className="w-full">
                {tdata.map(item => (
                    <li key={item.id} className="flex justify-between items-center border-b py-4">
                        <div className="flex-1 text-left">{item.title}</div>

                        <div className="relative">
                            {/* 도트 아이콘 */}
                            <div
                                tabIndex={0}
                                onBlur={() => setTimeout(() => setShowOptionsId(null), 100)} // 딜레이
                                className="cursor-pointer relative z-10"
                                onClick={() => toggleOptions(item.id)}
                            >
                                <HiOutlineDotsVertical/>
                            </div>

                            {/* 옵션 버튼 (조건부 렌더링) */}
                            {showOptionsId === item.id && (
                                <div
                                    className="w-28 absolute z-20 right-0 top-full mt-1 bg-white border rounded shadow p-2 space-y-3">

                                    <TailButton
                                        caption={<div className={`flex items-center gap-2`}><FaPencilAlt/>수정하기</div>}
                                        bcolor="mainColor"
                                        handleClick={() => handleUpdate(item)}
                                    />
                                    <TailButton
                                        caption={<div className={`flex items-center gap-2`}><RiDeleteBinLine/> 삭제하기
                                        </div>}
                                        bcolor="orange"
                                        handleClick={() => jsonDelete(item.id)}
                                    />
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

        </div>


    );
};