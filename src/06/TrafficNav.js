import TailButton from "../UI/TailButton";

export default function TrafficNav({title, c, sel, setSel}) {
    // title: 트래픽 네비게이션의 제목
    // c: 버튼으로 표시할 항목 리스트
    // sel: 현재 선택된 항목
    // setSel: 선택된 항목을 변경하는 setter 함수
    const cTag = c.map(item => <TailButton
                                key={item}
                                caption={item}
                                bcolor={sel === item ? 'orange' : 'blue'}
                                handleClick= {() => handleClick(item)}
    />);

    // 버튼클릭
    const handleClick = (item) => {
        setSel(item)
    }
    return (
        <div className={`w-full flex justify-start items-center my-5`}>
            <div className={`w-1/5 flex justify-start items-center`}>
                교통사고{title}
            </div>
            <div className={`w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2`}>
                {cTag}
            </div>

        </div>
    );
};