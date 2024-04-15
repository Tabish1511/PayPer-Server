interface AppbarInterface{
    initial: string;
}

export function Appbar(props: AppbarInterface){
    return (
    <div className="border-solid border-2 border-gray-300 shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayPer
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-gray-800 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl text-white">
                    {props.initial}
                </div>
            </div>
        </div>
    </div>
    )
}