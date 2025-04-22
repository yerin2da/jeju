export default function SignupInput({ label, type, name, value, onChange, required, maxLength, inputPlaceholder, children=null}) {
    return (
        <div className="flex w-full items-center justify-between pb-4">
            {/* 왼쪽 영역 (label + input) */}
            <div className="flex flex-col w-full">
                <label className="text-xs mb-1">
                    {label}
                    <span className="text-subColor2">*</span>
                </label>

                <div className={`flex items-center gap-2`}>
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        required={required}
                        maxLength={maxLength}
                        className="border px-2 py-2 text-sm w-full"
                        placeholder={inputPlaceholder}
                    />

                    {/* 오른쪽 버튼 */}
                    {children}
                </div>
            </div>


        </div>
    );
}