interface BannerComponentPropsAlt {
    text: string;
    icon: string;
}

export function BannerComponentAlt(props: BannerComponentPropsAlt){
    return (
        <div className="bg-cream-main rounded-lg h-96 w-2/4 p-16 flex flex-col justify-center">
            <div className="flex justify-around h-72">
                <div className="text-xl w-5/12 flex flex-col justify-center text-left">
                    {props.text}
                </div>
                <div className="w-5/12 flex flex-col justify-center justify-center">
                    <img src={props.icon} alt="cloud logo" className="h-full"></img>
                </div>
            </div>
        </div>
    )
}
