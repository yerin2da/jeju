// 포맷터 함수

// 천단위 콤마
export const formatNumber = (num) => {
    return num.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};

// 소수점 둘째 자리 + 천단위 콤마
export const formatNumber2 = (num, decimalPlaces = 2) => {//decimalPlaces:소수점 자리수를 몇 자리로 할지 정함
    return num.toLocaleString(undefined, {
        minimumFractionDigits: decimalPlaces,//최소 몇 자리까지 소수점 표현할지 지정//이미 decimalPlaces로 지정
        maximumFractionDigits: decimalPlaces,//최대 몇 자리까지 소수점 표현할지 지정
    });
};