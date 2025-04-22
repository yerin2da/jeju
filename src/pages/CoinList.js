import {useLocation, useSearchParams} from "react-router-dom";

export default function CoinList() {
    const fruits = ['🍎', '🍌', '🍉'];

    const loc = useLocation();
    console.log('useLocation pathname : ', loc.pathname);
    console.log('useLocation search : ', loc.search);//pathname뒷부분



    const [sParams] = useSearchParams();//size:1 쿼리스트링 개수
    console.log('useLocation search', sParams);


    const queryList = [...sParams];
    console.log('queryList', queryList);
    const list = queryList.map((item) => <li key={item[0]}>
        {item[1]} : {fruits.includes(item[1]) ? '과일' : '과일아님'}
    </li>)

    console.log(sParams.get('item1'));

    return (
        <div>
            c_list
            {/*wallet : {item}*/}
            {/*{fruits.includes(item) ? '과일입니다'*/}
            {/*    : '과일이 아닙니다'*/}
            {/*}*/}

            <ul>
                <li>
                    {list}
                </li>
            </ul>
        </div>
    );
};