interface TailButtonProps{
    caption: React.ReactNode;//문자든 아이콘이든 뭐든 React 안에서 쓸 수 있는 거 다 받을 수 있음
    handleClick: () => void;
    isSelected?: boolean;
    disabled?: boolean;
    className?: string;
    bcolor?:string;

}

export default function TailButton({caption, bcolor, isSelected, handleClick,
                                       disabled=false, className=""}: TailButtonProps) {

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
