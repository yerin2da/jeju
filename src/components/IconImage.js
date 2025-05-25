export default function IconImage({imageSrc, className, title, onClick=null}) {
    return (
        <img src={imageSrc}  alt={title+"이미지" || "이미지"}  title={title+"이미지" || "이미지"} onClick={onClick} className={`image hover:scale-110  transition-transform duration-500 ${className || ''} `}/>
    );
};