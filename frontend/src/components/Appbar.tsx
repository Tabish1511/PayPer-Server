import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { useRecoilValue } from "recoil";
import { userState } from "../store/atoms/userState";

export function Appbar() {
    const navigate = useNavigate();
    const user = useRecoilValue(userState);

    const handleLogout = () => {
        try {
        localStorage.removeItem("token");
        navigate("/signin");
        } catch (err) {
        console.error("An error occurred", err);
        }
    };

    return (
        <div className="border-solid border-2 border-gray-300 shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            <Link to={localStorage.getItem('token') ? "/dashboard" : "/landingPage"}>
                <div className="text-3xl font-black">
                    PayPer
                </div>
            </Link>
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">Hello</div>
            <div className="rounded-full h-12 w-12 bg-gray-800 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl text-white">{user.name[0]}</div>
            </div>
            <div className="flex flex-col justify-center h-full mr-4">
            <Button label="Logout" className="mb-4" onClick={handleLogout} />
            </div>
        </div>
        </div>
    );
}