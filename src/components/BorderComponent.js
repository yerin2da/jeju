export default function BorderComponent({text}) {
    return (
        <div className={`w-fit px-4 py-1 text-sm border border-white rounded-full`}>
            {text}
        </div>
    );
};