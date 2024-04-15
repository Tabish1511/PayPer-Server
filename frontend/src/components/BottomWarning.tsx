import { Link } from "react-router-dom";

interface BottomWarningProps{
    warning: string;
    to: string;
    link: string;
}

export function BottomWarning(props: BottomWarningProps){
    return (
            <div className="mx-4 mt-2 mb-3 font-normal text-black text-base text-center pt-2">
                {props.warning}
                <Link className="underline cursor-pointer" to={props.to}>
                    {props.link}
                </Link>
            </div>
    )
}