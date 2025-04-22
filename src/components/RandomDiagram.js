

const types = ['circle', 'square', 'triangle'];
const colors = ['rgba(244,143,143,0.4)',   // 빨강
    'rgba(174,243,174,0.4)',   // 초록
    'rgba(185,185,255,0.4)',   // 파랑
];

const random = (arr) => {//함수 본문이라서 {}뒤에 리턴 필요
    return arr[Math.floor(Math.random() * arr.length)];
}

const randomPosition = () => ({ // (): 객체를 명확하게 리턴하고 싶으면 괄호로 감싸야 함
    top : `${Math.random() *100}%`,
    left : `${Math.random() *100}%`,
});

const Item = ({type, color, top, left}) => {
    const base = 'absolute pointer-events-none';

    if(type === 'triangle'){
        return(
            <div
                className={base}
                style={{
                    top,
                    left,
                    width: 0,
                    height: 0,
                    borderLeft: '20px solid transparent',
                    borderRight: '20px solid transparent',
                    borderBottom: `40px solid ${color}`,
                }}
            />
        );
    }

    return (
        <div
            className={`${base} w-40 h-40 z-[9999] ${type === 'circle' ? 'rounded-full' : ''}`}
            style={{ top, left, backgroundColor: color }}
        />
    );
};

export default function RandomDiagram() {
    const items = Array.from({ length: 30 }).map((i) => ({
        type: random(types),
        color: random(colors),
        ...randomPosition(),
    }));
    return (
        <div>
            {items.map((it, index) => (
                <Item key={index} {...it} />
            ))}
        </div>
    );
};