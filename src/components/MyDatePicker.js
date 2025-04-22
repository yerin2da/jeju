import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import {useRecoilState} from "recoil";
import {dateAtom} from "../recoil/atoms";

export default function MyDatePicker() {
    const [date, setDate] = useRecoilState(dateAtom)
    const [tempDate, setTempDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const datePickerRef = useRef(null);

    const openModal = () => {
        setTempDate(date); // 기존 선택값을 임시값으로 복사
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleConfirm = () => {
        setDate(tempDate);
        closeModal();
    };

    return (
        <div className="relative z-10">
            {/* 날짜 표시 인풋 */}
            <input
                readOnly
                onClick={openModal}
                value={
                    date
                        ? format(date, "yyyy.MM.dd.(eee)", { locale: ko })
                        : ""
                }
                placeholder="날짜를 선택하세요"
            />

            {/* 모달 */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-xl p-4">

                        {/* 달력 */}
                        <DatePicker
                            ref={datePickerRef}
                            selected={tempDate}
                            onChange={(date) => setTempDate(date)}
                            inline
                            locale={ko}
                            renderCustomHeader={({
                                                     date,
                                                     decreaseMonth,
                                                     increaseMonth,
                                                     prevMonthButtonDisabled,
                                                     nextMonthButtonDisabled,
                                                 }) => (
                                <div className="flex justify-between items-center pt-1 pb-2 px-4">
                                    <button
                                        onClick={decreaseMonth}
                                        disabled={prevMonthButtonDisabled}
                                        className="text-lg text-textDarkGray"
                                    >
                                        &lt;
                                    </button>
                                    <div className="text-lg font-[600]">
                                        {format(date, "yyyy.MM", { locale: ko })}
                                    </div>
                                    <button
                                        onClick={increaseMonth}
                                        disabled={nextMonthButtonDisabled}
                                        className="text-lg text-textDarkGray"
                                    >
                                        &gt;
                                    </button>
                                </div>
                            )}
                        />

                        {/* 버튼 영역 */}
                        <div className="flex gap-1">
                            <button
                                onClick={closeModal}
                                className="date_btn flex-1 py-2 rounded text-textGray border-2 border-textGray"
                            >
                                닫기
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex-1 bg-blue-600 py-2 rounded text-white"
                            >
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
