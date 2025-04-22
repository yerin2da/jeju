import { useState, forwardRef, useEffect } from "react";

const TextArea = forwardRef(
    (
        {
            maxLength = 300,
            placeholder = "텍스트를 입력하세요",
            className,
            value = "", // 기본값 안전하게 설정
            onChange,
        },
        ref
    ) => {
        const [txtLength, setTxtLength] = useState(value.length);//현재 글자수

        useEffect(() => {
            setTxtLength(value.length);
        }, [value]);

        const handleTextChange = (e) => {
            const val = e.target.value.slice(0, maxLength); // 글자 제한
            setTxtLength(val.length);//잘라낸 최종 문자열

            // 부모에게 가공된 값 전달
            if (onChange) {
                onChange(val); // 문자열로 넘김
            }
        };

        return (
            <div className={`text-sm flex flex-col items-end ${className}`}>
                <div className="w-full rounded-xl bg-white h-[112px] max-h-[112px] border border-textLightGray px-6 py-4 mb-1">
          <textarea
              ref={ref}
              className="w-full h-full text-textDarkGray font-semibold resize-none"
              maxLength={maxLength}
              placeholder={placeholder}
              value={value}
              onChange={handleTextChange}
          />
                </div>
                <p className="text-textBlack">
                    {txtLength}
                    <span className="text-textGray">/{maxLength}자</span>
                </p>
            </div>
        );
    }
);

export default TextArea;
