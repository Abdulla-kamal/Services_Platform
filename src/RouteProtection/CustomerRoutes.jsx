import { Outlet } from "react-router-dom";
import { useUser } from "../Context/UserProvider"

export default function CustomerRoutes() {
    const {user} = useUser();
    return user && user.role === "Customer" && <Outlet/>
}