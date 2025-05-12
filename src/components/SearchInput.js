import React, { forwardRef } from "react";
import { IoSearch } from "react-icons/io5";

const SearchInput = forwardRef(function SearchInput(
    { inputPlaceholder, className = "", value, onChange, onSearch, btnClassName = "" },
    ref
) {
    return (
        <div className="group focus-within:border-mainColor flex w-full items-center justify-center relative text-base">
            <input
                ref={ref}
                className={`w-full h-10 rounded pl-4 pr-10 border text-textBlack placeholder-gray-300 border-gray-300 focus:outline-none focus:border-mainColor transition-colors duration-300 ${className}`}
                type="text"
                placeholder={inputPlaceholder}
                value={value}
                onChange={onChange}
                onKeyDown={(e) => e.key === "Enter" && onSearch?.()}
                autoComplete="off"
            />
            <div className="flex items-center cursor-pointer justify-center h-full absolute right-3 top-0">
                <IoSearch
                    onClick={onSearch}
                    className={`group-focus-within:text-mainColor text-gray-300 cursor-pointer text-2xl transition-colors duration-300 ${btnClassName}`}
                />
            </div>
        </div>
    );
});

export default SearchInput;
