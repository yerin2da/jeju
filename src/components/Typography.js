export default function Typography({ as = "p", variant = "body", className = "", children }) {
    const Tag = as; // 동적으로 h1, h2, p 등 설정 가능

    const styles = {
        h1: "text-4xl font324223-bold" , // 36px - 페이지 타이틀
        h2: "text-3xl font324223-semibold", // 30px - 섹션 제목
        h3: "text-2xl", // 24px - 소제목
        h4: "text-xl", // 20px - 카드/박스 제목
        lg: "text-lg", // 18px -
        base: "text-base", // 16px - 기본 본문
        sm: "text-sm", // 14px - 설명, 보조 텍스트
        xs: "text-xs", // 12px - 설명, 보조 텍스트
    };

    return <Tag className={`${styles[variant]} ${className}`}>{children}</Tag>;
}
