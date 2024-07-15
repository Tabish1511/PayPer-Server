import cloudLogo from '../assets/undraw_cloud_sync_re_02p1.svg';

export function BannerComponent(){
    return (
        <div className="border-solid border-2 border-sky-500 bg-white rounded-lg h-96 w-2/4 p-16 flex flex-col justify-center">
            <div className="flex justify-between h-72">
                <div className="text-xl w-5/12 flex flex-col justify-center text-left">
                Access your dashboard on the go as the platform stands on serverless cloud architecture
                </div>
                <div className="w-5/12 flex flex-col justify-center justify-center">
                    <img src={cloudLogo}></img>
                </div>
            </div>
        </div>
    )
}



































// import cloudLogo from '../assets/undraw_cloud_sync_re_02p1.svg';

// export function BannerComponent(){
//     return (
//         <div className="border-solid border-2 border-sky-500 bg-white rounded-lg h-96 w-2/4 p-16 flex flex-col justify-center">
//             <div className="flex justify-between h-72">
//                 <div className="text-xl w-5/12 flex flex-col justify-center text-left">
//                 Access your dashboard on the go as the platform stands on serverless cloud architecture
//                 </div>
//                 <div className="w-5/12 flex flex-col justify-center justify-center">
//                     <img src={cloudLogo}></img>
//                 </div>
//             </div>
//         </div>
//     )
// }














// export function BannerComponent(){
//     return (
//         <div className="border-solid border-2 border-sky-500 bg-white rounded-lg h-96 w-2/4 p-16 flex flex-col justify-center">
//             <div className="flex justify-between h-72">
//                 <div className="text-xl w-5/12 flex flex-col justify-center text-left">
//                 Access your dashboard on the go as the platform stands on serverless cloud architecture
//                 </div>
//                 <div className="w-1/3 flex flex-col justify-center text-center">
//                     Banner icon
//                 </div>
//             </div>
//         </div>
//     )
// }