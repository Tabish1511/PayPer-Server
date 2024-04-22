import { Appbar } from "../components/Appbar"
import { ClientEditingComponent } from "../components/ClientEditingComponent"

export function EditClient() {
    

    return (
        <div className="h-screen flex flex-col">
            <Appbar />
            <ClientEditingComponent />
        </div>
    )
}
