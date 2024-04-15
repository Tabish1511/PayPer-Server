import { Appbar } from "../components/Appbar"
import { Clients } from "../components/Clients"

export function Dashboard(){
    return (
        <div className="h-screen flex flex-col">
            <Appbar initial="U"/>
            <div className="flex-1 bg-cream-main flex items-center justify-center">
                <Clients />    
            </div>
        </div>
    )
}