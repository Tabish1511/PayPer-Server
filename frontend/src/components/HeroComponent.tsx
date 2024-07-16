import { Link } from "react-router-dom";
import { Button } from "./Button";

export function HeroComponent() {
    return (
        <div className="h-96 w-96">
            <div className="text-8xl font-black flex flex-col justify-center text-center my-4">
                PayPer
            </div>
            <div className="text-2xl font-medium flex flex-col justify-center text-center my-4">
                The installment tracker your business needs
            </div>
            <Link to="/signup">
                <div className="flex justify-center my-4">
                    <Button label="Sign up" className="mb-4 w-48" />
                </div>
            </Link>
        </div>
    )
}