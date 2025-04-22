
import React, { forwardRef } from 'react';

const RegisterInput = forwardRef(({
                                    label, type, name, value, onChange, required, inputPlaceholder, autoComplete, children, maxLength, inputClassName, wrapClassName
                                }, ref) => {
    return (
        <div className={`flex w-full items-center justify-between ${wrapClassName}`}>
            {/* 왼쪽 영역 (label + input) */}
            <div className="flex flex-col w-full">
                <label className="text-xs mb-1">
                    {label}
                    <span className="text-subColor2">*</span>
                </label>

                <div className={`flex items-center`}>
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        required={required}
                        maxLength={maxLength}
                        className={`border px-2 py-2 text-sm w-full ${inputClassName}`}
                        placeholder={inputPlaceholder}
                        autoComplete={autoComplete}
                        ref={ref}
                    />

                    {/* 오른쪽 버튼 */}
                    {children}
                </div>
            </div>
        </div>
    );
});

export default RegisterInput;