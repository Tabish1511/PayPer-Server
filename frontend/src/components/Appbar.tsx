import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";

interface AppbarInterface{
    initial: string;
}

export function Appbar(props: AppbarInterface){
    const navigate = useNavigate();

    const handleLogout = () => {
        try{
            localStorage.removeItem('token');
            navigate('/signin');
        }catch(err){
            console.error('An error occurred', err);      
        }
    };

    return (
    <div className="border-solid border-2 border-gray-300 shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            <Link to="/dashboard">PayPer</Link>
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-gray-800 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl text-white">
                    {props.initial}
                </div>
            </div>            
            <div className="flex flex-col justify-center h-full mr-4">
                <Button label="Logout" className="mb-4" onClick={handleLogout} />
            </div>
        </div>
    </div>
    )
}