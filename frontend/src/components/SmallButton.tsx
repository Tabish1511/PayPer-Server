interface SmallButtonProps{
    id?: number;    // REMOVE THE '?'
    label: string;
    onClick?: () => void;
}

export function SmallButton(props: SmallButtonProps){

    return (
        <div className="mx-1 my-0.5">
            <button
            // onClick={props.onClick}
            onClick={props.onClick}
            type="button" 
            className="h-11 w-11 text-white bg-gray-800 font-medium rounded-lg text-base hover:bg-gray-700 active:ring-gray-700 active:ring-2">
            {props.label}
            </button>
        </div>
    )
}