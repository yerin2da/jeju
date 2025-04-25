export default function SectionTitle({icon, title, className=''}) {
    return (
        <p className={`font-bold text-lg pb-3 flex items-center gap-1 ${className}`}>{title} {icon}</p>
    );
};