import RouteHome from "./RouteHome";
import RoutePage3 from "./RoutePage3";
import RoutePage2 from "./RoutePage2";
import RoutePage1 from "./RoutePage1";
import RouteNav from "./RouteNav";
import {BrowserRouter, Route, Routes} from "react-router-dom";

export default function RouteMain() {
    return (
        <div>
            <BrowserRouter>
                <RouteNav/>
                <Routes>
                    <Route path="/" element={<RouteHome/>} />
                                {/*element는 해당 경로(path)가 매칭될 때 렌더링할 컴포넌트를 의미*/}
                    <Route path="/p1" element={<RoutePage1/>} />
                    <Route path="/p2" element={<RoutePage2/>} />
                    <Route path="/p3" element={<RoutePage3/>} />
                </Routes>
            </BrowserRouter>


        </div>
    );
};