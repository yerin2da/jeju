export default function RoundedTab({children, className, }) {
    return (
        <button className={`w-fit px-4 rounded-2xl h-8 ${className}`}>
            {children}
        </button>
    );
};