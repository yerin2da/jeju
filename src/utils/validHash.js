import md5 from 'md5';

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

export const validHash = (auth, time, hash) => {
    // console.log('validHash params:', { auth, time, hash });
    // console.log('SECRET_KEY:', SECRET_KEY);

    if (!auth || !time || !hash) {
        console.warn('값이 누락되었습니다.');
        return false;
    }

    const newHash = md5(auth + SECRET_KEY + time);

    if (newHash !== hash) {
        console.warn('해시가 일치하지 않습니다.');
        return false;
    }

    return true; // 검증 성공
};