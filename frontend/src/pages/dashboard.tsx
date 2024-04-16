import { Appbar } from "../components/Appbar"
import { Clients } from "../components/Clients"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Dashboard(){
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
          navigate('/signin');
        }
    }, []);
      


    return (
        <div className="h-screen flex flex-col">
            <Appbar initial="U"/>
            <div className="flex-1 bg-cream-main flex items-center justify-center">
                <Clients />    
            </div>
        </div>
    )
}