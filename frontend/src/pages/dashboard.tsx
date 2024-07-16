import { Appbar } from "../components/Appbar"
import { Clients } from "../components/Clients"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Dashboard(){
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || token === 'null') {
          navigate('/signin');
        }
    }, []);
      
    return (
        <div className="h-screen flex flex-col">
            <Appbar/>
            <div className="flex-1 bg-cream-main flex items-center justify-center">
                <Clients />    
            </div>
        </div>
    )
}