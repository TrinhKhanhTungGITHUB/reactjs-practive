import { Route, Routes } from "react-router";
import Home from "../Home";
import TableUsers from "../TableUsers";
import Login from "../Login";
import PrivateRouter from "./PrivateRouter";

const AppRouters = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/users' element={
                <PrivateRouter>
                    <TableUsers />
                </PrivateRouter>
            }
            />
        </Routes>
    )
}

export default AppRouters;