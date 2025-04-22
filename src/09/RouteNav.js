import TailButton from "../UI/TailButton";
import {useLocation, useNavigate} from "react-router-dom";

export default function RouteNav() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="w-10/12 grid grid-cols-3 m-5">
            <TailButton caption='home'
                        bcolor='blue'
                        handleClick={()=> navigate('/')}
                        isSelected={location.pathname === '/'}
            />
            <TailButton caption='wallet'
                        bcolor='blue'
                        handleClick={()=> navigate('/p1')}
                        isSelected={location.pathname === '/p1'}
            />
            <TailButton caption='c_list'
                        bcolor='blue'
                        handleClick={()=> navigate('/p2')}
                        isSelected={location.pathname === '/p2'}
            />
            <TailButton caption='my'
                        bcolor='blue'
                        handleClick={()=> navigate('/p3')}
                        isSelected={location.pathname === '/p3'}
            />
        </div>
    );
};