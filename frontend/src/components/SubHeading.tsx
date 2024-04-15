interface SubHeadingProps{
    label: string;
}

export function SubHeading(props: SubHeadingProps){
    return (
            <div className="mx-4 mb-5 font-normal text-gray-500 text-lg text-center pt-2">
                {props.label}
            </div>
    )
}