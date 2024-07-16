import { HeroComponent } from "../components/HeroComponent";
import { LandingPageAppbar } from "../components/LandingPageAppbar";
import dashboardLogo from "../assets/Screenshot from 2024-07-12 15-22-06.png"
import cloudLogo from '../assets/undraw_cloud_sync_re_02p1.svg';
import prismaLogo from '../assets/prisma-3.svg';
import reactTailwindLogo from '../assets/reactAndTailwind.png';
import mailSentSvg from '../assets/undraw_mail_sent_re_0ofv.svg';
import { BannerComponent } from "../components/BannerComponent";
import { BannerComponentAlt } from "../components/BannerComponentAlt";
import { Footer } from "../components/Footer";

export function LandingPage(){
    return (
        <div className="bg-cream-main h-auto pt-6">
            <div className="w-full flex justify-center">
                <LandingPageAppbar />
            </div>
            <div className="flex justify-center mt-40">
                <HeroComponent />
            </div>
            <div className="flex justify-center">
                <img src={dashboardLogo} className="w-3/4 h-auto"></img>
            </div>
            <div className="py-40 flex justify-center">
                <BannerComponent 
                    text="Access your dashboard on the go as the platform stands on serverless cloud architecture"
                    icon={cloudLogo}/>
            </div>
            <div className="bg-black rounded-xl py-40 flex justify-center">
                <BannerComponentAlt 
                    text="As your business’ sales numbers grow PayPer grows with you thanks to PrismaDB’s scalability capabilities"
                    icon={prismaLogo}/>
            </div>
            <div className="py-40 flex justify-center">
                <BannerComponent 
                    text="Never a hiccup in accessing your dashboard as Tailwindcss and Reactjs make the UI/UX experience a breeze"
                    icon={reactTailwindLogo}/>
            </div>
            <div className="bg-black rounded-t-xl py-40 flex justify-center">
                <BannerComponentAlt 
                    text="Get email notifications on every step of the way in your journey to grow a successful business"
                    icon={mailSentSvg}/>
            </div>
            <Footer />
        </div>
    )
}