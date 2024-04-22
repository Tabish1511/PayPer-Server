import { Appbar } from "../components/Appbar"
import { ClientEditingComponent } from "../components/ClientEditingComponent"

export function EditClient() {
    

    return (
        <div className="h-screen flex flex-col">
            <Appbar />
            <div className="flex-1 bg-cream-main flex items-center justify-center">
                <ClientEditingComponent />
            </div>
        </div>
    )
}
