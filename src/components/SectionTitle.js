export default function SectionTitle({icon, title, className=''}) {
    return (
        <div className={`font-bold text-lg pb-4 flex items-center gap-1 ${className}`}>{title} {icon}</div>
    );
};