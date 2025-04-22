export default function TailButton({caption, bcolor, isSelected, handleClick, disabled=false, className=""}) {

    return (
        <button className={`text-base
            ${className}
            ${bcolor} 
            ${isSelected ? 'border border-yellow-400' : 'border-transparent'}
            ${disabled ? 'opacity-10 cursor-default' : 'cursor-pointer'}
        `}
                onClick={handleClick}
                disabled={disabled} // 🔥 버튼 비활성화 속성 추가
        >
            {caption}
        </button>
    );
};
