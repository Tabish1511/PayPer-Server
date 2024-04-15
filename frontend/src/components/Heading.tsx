
interface HeadingProps {
    label: string;
}

export function Heading(props: HeadingProps){
    return (
            <div className="mx-2 font-bold text-black text-3xl text-center pt-5">
                {props.label}
            </div>
    )
}