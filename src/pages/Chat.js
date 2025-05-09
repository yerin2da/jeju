import { io } from 'socket.io-client';
import {useEffect, useRef, useState} from "react";
import {useRecoilValue} from "recoil";
import {nicknameState} from "../recoil/atoms";

export default function Chat() {
    const socket = useRef(null);
    const [message, setMessage] = useState('');//현재 입력 중인 채팅 메시지를 담는 변수
    const [chat, setChat] = useState([]);//지금까지 받은 메시지를 저장하는 배열
    const nickname = useRecoilValue(nicknameState);//닉네임

    useEffect(() => {
        // socket.current = io('http://192.168.0.113:3000/');//서버

        socket.current.on('chat', (msg) => {//메시지 받기('chat':이벤트 등록)
            setChat((prev) => [...prev, msg]);
            console.log(msg);
        })

        socket.current.on('del_chat', (msg) => {
            setChat((prev) => prev.filter((item) => item.idx !== msg.idx));//item: chat 배열 안의 "각 메시지 객체
            console.log("[수신]",msg);
        })

        return () => {
            socket.current.off('chat')//이벤트 제거
            socket.current.off('del_chat')//이벤트 제거
        }
    },[]);

    //내가 보낸 메시지 삭제
    const deleteMessage = (targetIdx) => {

        setChat((prev) => prev.filter((item) => item.idx !== targetIdx));// 화면에서 삭제

        const data = { idx: targetIdx };
        socket.current.emit('del_chat', data);//서버에 삭제 요청
    }

    // 메시지 보내기
    const sendMessage = () => {
        if(!message.trim()) return;

        const data = {
            userName: nickname, // 닉네임
            message: message // 입력한 메시지
        };

        socket.current.emit('chat', data);//메시지 보내기(데이터 보냄)
        setMessage("");
    }

    return (
        <div>
            <ul>
                {chat.map((msg) => (
                    <li
                        key={msg.idx}
                    >
                        [{msg.idx}]{msg.userName}:{msg.message}
                        {msg.userName === nickname && (
                            <button onClick={() => deleteMessage(msg.idx)}>삭제</button>
                        )}
                    </li>
                ))}
            </ul>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={"메시지 입력"}
            />
            <button onClick={sendMessage}>보내기</button>
        </div>
    );
};
