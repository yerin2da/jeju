export default function SectionTitle({icon, title}) {
    return (
        <p className={`font-bold text-lg pb-3 flex items-center gap-1`}>{title} {icon}</p>
    );
};