import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";

export function Appbar(){
    const navigate = useNavigate();
    const [user, setUser] = useState("");

    useEffect(() => {
        axios.get("https://payper-server.khaqantabish.workers.dev/api/v1/user/getUser" , {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response) => {
            setUser(response.data.user.name);
        })
        .catch(err => {
            console.error('Error fetching logged in user data', err);
        });
    }, []);

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
                    {user[0]}
                </div>
            </div>            
            <div className="flex flex-col justify-center h-full mr-4">
                <Button label="Logout" className="mb-4" onClick={handleLogout} />
            </div>
        </div>
    </div>
    )
}