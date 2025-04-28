
import React, { forwardRef } from "react";
import { IoSearch } from "react-icons/io5";

const SearchInput = forwardRef(function SearchInput(
    { inputPlaceholder, className = "", value, onChange, onSearch },
    ref
) {
    return (
        <div className="flex w-full items-center justify-center relative text-base">
            <input
                ref={ref}
                className={`w-full h-10 rounded pl-4 pr-10 border text-textBlack placeholder-gray-300 ${className}`}
                type="text"
                placeholder={inputPlaceholder}
                value={value}
                onChange={onChange}
                onKeyDown={(e) => e.key === 'Enter' && onSearch?.()}
                autoComplete="off"
            />
            <div className="flex items-center justify-center h-full absolute right-3 top-0">
                <IoSearch
                    onClick={onSearch}
                    className="text-gray-300 cursor-pointer text-2xl"
                />
            </div>
        </div>
    );
});

export default SearchInput;
