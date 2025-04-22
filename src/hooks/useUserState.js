// import { createContext, useContext, useState } from "react";
//
// const UserContext = createContext();
//
// export function UserProvider({children}) {
//     const [nickname, setNickname] = useState("");
//
//     return (
//         <UserContext.Provider value={{nickname, setNickname}}>
//             {children}
//         </UserContext.Provider>
//     );
// }
//
// export function useUserState() {
//     return useContext(UserContext);
// }