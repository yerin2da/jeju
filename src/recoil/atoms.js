import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const isLoggedInState = atom({//로그인 상태
    key: 'isLoggedInState',
    default: false,//기본값
    effects_UNSTABLE: [persistAtom], //로컬에 저장된 값이 있으면 덮어쓰기 해 줌
});

export const userIdState = atom({//아이디
    key: 'userIdState',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const nicknameState = atom({//닉네임
    key: 'nicknameState',
    default: '',
    effects_UNSTABLE: [persistAtom],
});

//sell//
export const dateAtom = atom({//날짜 선택
    key: "dateAtom",
    default: null, // 기본값은 null (선택 안 된 상태)
});
export const timeAtom = atom({//시간 선택
    key: "timeAtom",
    default: "10:00",
});
export const currencyAtom = atom({//화폐 옵션 선택
    key: 'currencyAtom',
    default: {
        selC1: "ESA",
        selC2: null,
        count: {},
        isoCode: null,
        trade_currency_type_idx: [],
        curency_count: [],
    },
});
export const locationAtom = atom({ //거래장소 좌표값
    key: 'locationAtom',
    default: { lat: '', lng: '' },
});
export const locaAddressAtom = atom({ //거래장소 주소
    key: 'locaAddressAtom',
    default: null, // { lat: number, lng: number }
});
export const detailAddressAtom = atom({ //상세장소
    key: 'detailAddressAtom',
    default: '',
});
export const clickedLatLngAtom = atom({//마커표시
    key: 'clickedLatLngAtom',
    default: null,
});
export const imageUrlAtom = atom({//이미지 idx
    key: "imageUrlAtom",
    default: "",
});

export const imageIdxAtom = atom({//이미지 URL
    key: "imageIdxAtom",
    default: null,
});
