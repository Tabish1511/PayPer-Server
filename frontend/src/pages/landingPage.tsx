import { HeroComponent } from "../components/HeroComponent";
import { LandingPageAppbar } from "../components/LandingPageAppbar";
import dashboardLogo from "../assets/Screenshot from 2024-07-12 15-22-06.png"
import cloudLogo from '../assets/undraw_cloud_sync_re_02p1.svg';
import { BannerComponent } from "../components/BannerComponent";

export function LandingPage(){
    return (
        <div className="bg-cream-main h-auto p-6">
            <div className="w-full flex justify-center">
                <LandingPageAppbar />
            </div>
            <div className="flex justify-center mt-40">
                <HeroComponent />
            </div>
            <div className="flex justify-center">
                <img src={dashboardLogo} className="w-3/4 h-auto"></img>
            </div>
            <BannerComponent 
                text="Access your dashboard on the go as the platform stands on serverless cloud architecture"
                icon={cloudLogo}/>
        </div>
    )
}