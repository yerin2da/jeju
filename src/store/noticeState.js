import {atom} from "recoil";


// 공지사항 카테고리 상태 전역관리
export const categoryState = atom({
    key : "categoryState", // 고유 key 값
    default: "all",        // 초기값
})

// 내지갑 카테고리 상태 전역관리
export const walletCategoryState = atom({
    key : "walletCategoryState", // 고유 key 값
    default: "exchangeList",        // 초기값
})

// 현재 페이지 상태 전역관리
export const pageState = atom({
    key: "pageState",
    default: 1,
});