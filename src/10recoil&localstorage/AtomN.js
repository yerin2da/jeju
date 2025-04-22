import {atom, selector} from "recoil";


export const AtomN = atom({
    key: "AtomN",
    default : 0
});

export const AtomN2 = selector({
    key: "AtomN@",
    get : ({get}) => {
        return get(AtomN) * 2;
    }
})