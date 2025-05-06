import React, { useState } from "react";
import IconImage from "./IconImage";
import { FaTimes } from "react-icons/fa";

export default function JejuThemeGalleryCard({ item }) {
    const [modalImage, setModalImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageClick = (src) => {
        setModalImage(src);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalImage(null);
    };

    return (
        <div className="contentsBox !p-0 overflow-hidden !rounded-2xl bg-white relative">

            {/* 이미지 */}
            <div className="px-6 py-4">
                <div className="flex gap-2 h-60">
                    <div
                        className="w-3/5 h-full cursor-pointer"
                        onClick={() =>
                            handleImageClick(
                                `${process.env.PUBLIC_URL}/img/theme/${item.spotAreaId}.jpg`
                            )
                        }
                    >
                        <IconImage
                            className="w-full h-full object-cover rounded-xl"
                            imageSrc={`${process.env.PUBLIC_URL}/img/theme/${item.spotAreaId}.jpg`}
                            title={item.spotName}
                        />
                    </div>

                    <div className="w-2/5 flex flex-col gap-2 h-full">
                        {[2, 3].map((num) => (
                            <div
                                key={num}
                                className="w-full h-1/2 cursor-pointer"
                                onClick={() =>
                                    handleImageClick(
                                        `${process.env.PUBLIC_URL}/img/theme/${item.spotAreaId}_${num}.jpg`
                                    )
                                }
                            >
                                <IconImage
                                    className="w-full h-full object-cover rounded-xl"
                                    imageSrc={`${process.env.PUBLIC_URL}/img/theme/${item.spotAreaId}_${num}.jpg`}
                                    title={item.spotName}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="font-bold text-xl mt-4 mb-2">{item.spotName}</div>
                <div className="text-gray-700">
                    <p className="text-sm font-medium multi-ellipsis">{item.thema}</p>
                    <p className="text-sm font-medium multi-ellipsis">{item.spotAreaId}</p>
                </div>
            </div>

            {/* 모달 */}
            {isModalOpen && (
                <div
                    className="w-full px-2 fixed inset-0 bg-black bg-opacity-70 z-[9999] flex items-center justify-center"
                    onClick={handleCloseModal}
                >
                    <div className="w-full relative">
                        {/* 이미지 */}
                        <img
                            src={modalImage}
                            alt="확대 이미지"
                            className="w-full max-h-[80vh] object-contain rounded-lg shadow-lg border-2 border-white"
                            onClick={(e) => e.stopPropagation()} // 이미지 클릭 시 모달 닫힘 방지
                        />

                        {/* 닫기 버튼 */}
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="absolute top-2 right-2 w-8 h-8 bg-mainColor
                            text-white rounded-full
                            flex items-center justify-center shadow-lg"
                        >
                            <FaTimes size={14} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
