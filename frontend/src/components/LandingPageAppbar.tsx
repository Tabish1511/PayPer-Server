import { Link } from "react-router-dom";
import { Button } from "./Button";

export function LandingPageAppbar(){
    return (
        <div className="bg-white rounded-lg h-16 w-3/4 flex flex-col justify-center">
            <div className="flex justify-between px-4">
                <div className="text-4xl font-black flex flex-col justify-center text-center">
                    P
                </div>
                <div className="flex">
                    <Link to="/signin">
                        <div className="flex flex-col justify-center h-full">Login</div>
                    </Link>
                    <Link to="/signup">
                        <div className="flex flex-col justify-center">
                            <Button label="Get Started" className="mb-4 mr-0 w-48" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}