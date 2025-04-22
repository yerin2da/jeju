import {useParams} from "react-router-dom";

export default function Wallet() {
    const item = useParams().item;
    const fruits = ['🍎', '🍌', '🍉'];
    return (
        <div>
            wallet : {item}
            {fruits.includes(item) ? '과일입니다'
                                   : '과일이 아닙니다'
            }
        </div>
    );
};