import { useLocation, useNavigate } from "react-router-dom";

export default function NavIcon({ to, Icon, label, className }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <div className="flex flex-col items-center justify-between p-3 cursor-pointer" onClick={() => navigate(to)}>
            <Icon
                className={`w-6 h-6 transition-colors ${className} ${
                    isActive ? "text-mainColor" : "text-[#D1D1D1]"
                }`}
            />
            <span className={`text-xs xs:text-sm font-medium mt-1 ${
                isActive ? "text-mainColor" : "text-[#D1D1D1]"
            }`}>
                {label}
            </span>
        </div>
    );
}
