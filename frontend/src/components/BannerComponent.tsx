interface BannerComponentProps {
    text: string;
    icon: string;
}

export function BannerComponent(props: BannerComponentProps){
    return (
        <div className="bg-white rounded-lg h-96 w-2/4 p-16 flex flex-col justify-center">
            <div className="flex justify-between h-72">
                <div className="text-xl w-5/12 flex flex-col justify-center text-left">
                    {props.text}
                </div>
                <div className="w-5/12 flex flex-col justify-center justify-center">
                    <img src={props.icon} alt="cloud logo"></img>
                </div>
            </div>
        </div>
    )
}
