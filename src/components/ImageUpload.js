
import React, {useEffect, useState} from "react";
import {FaCamera, FaTimes} from "react-icons/fa";
import axios from "axios";
import { useRecoilState } from "recoil";
import { imageUrlAtom, imageIdxAtom } from "../recoil/atoms"; // 경로는 맞게 수정

const apiKey = process.env.REACT_APP_API_BASE_URL;
const url = `${apiKey}/Trade/image`;

export default function ImageUpload({ className }) {
    const [imageUrl, setImageUrl] = useRecoilState(imageUrlAtom);
    const [imageIdx, setImageIdx] = useRecoilState(imageIdxAtom);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const { data } = await axios.post(url, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (data.result === "success") {
                const { image_idx, full_url } = data.code;
                setImageUrl(full_url);
                setImageIdx(image_idx);

                console.log(image_idx);

            } else {
                alert(data.msg || "JPEG 또는 PNG 형식의 이미지만 업로드할 수 있습니다.");
            }
        } catch (error) {
            console.error("API 요청 에러:", error);
            alert("서버 오류 발생");
        }

        e.target.value = null;
    };

    const handleDelete = () => {
        setImageUrl("");
        setImageIdx("");
        console.log(imageIdx);
    };

    return (
        <div className={`${className}`}>
            {imageUrl  ? (
            // 업로드 후
                <div className="relative w-24 h-20">
                    {/* 이미지 박스 */}
                    <div className="w-full h-full rounded-lg overflow-hidden border border-textLightGray">
                        <img
                            src={imageUrl}
                            alt="미리보기"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* X 버튼 */}
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="z-20 absolute top-[-5px] right-[-5px] w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center shadow"
                    >
                        <FaTimes size={12}/>
                    </button>
                </div>

            ) : (
            // 업로드 전
                <label
                    htmlFor="image-upload"
                    className="dotBorder border-textGray"
                >
                    <FaCamera size={20}/>
                    <span className={`pl-3`}>사진 첨부하기</span>
                </label>
            )}

            <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
            />
        </div>
    );
}
