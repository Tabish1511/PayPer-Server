import { HeroComponent } from "../components/HeroComponent";
import { LandingPageAppbar } from "../components/LandingPageAppbar";

export function LandingPage(){
    return (
        <div className="bg-cream-main h-screen p-6">
            <div className="w-full flex justify-center">
                <LandingPageAppbar />
            </div>
            <div className="flex justify-center my-20">
                <HeroComponent />
            </div>
        </div>
    )
}