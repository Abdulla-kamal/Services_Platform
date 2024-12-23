import { Outlet } from "react-router-dom";
import { useUser } from "../Context/UserProvider"

export default function SellerRoutes() {
    const {user} = useUser();
    return user && user.role === "Seller" && <Outlet/>
}