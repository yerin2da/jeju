import LiveCurrency from "./LiveCurrency";

export default function SearchLiveCurrency({item}) {

    return (
        <div className={`p-5 bg-white `}>

            <div
                className="relative w-full rounded-2xl overflow-hidden h-44 xs:h-48 sm:h-56 bg-cover p-4 flex items-end shadow-lg shadow-gray-400"
                style={{
                    backgroundImage: `url('/img/asia_bg.jpg')`,
                    backgroundPosition: '60% top', // ← 왼쪽에서 조금 오른쪽으로 이동
                }}>

                <div className="absolute inset-0 bg-black bg-opacity-40 z-0"/>

                <div className="relative z-10 w-full">
                    <LiveCurrency
                        // key={index}
                        name={item.name}
                        code={item.code}
                        // exchange={item.exchange}

                        className="border border-mainColor"/>
                </div>

            </div>
        </div>
    );
};