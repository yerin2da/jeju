export default function SectionTitle({icon, title}) {
    return (
        <p className={`font-bold text-lg pb-3`}>{icon} {title}</p>
    );
};