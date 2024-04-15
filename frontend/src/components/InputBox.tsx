interface InputBoxProps {
    label: string;
    type: string;
    id: string;
    name: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputBox(props: InputBoxProps){
    return (
            <div className="mx-6 mt-4 font-medium text-base text-slate-900">
                {props.label} <br/>
                <input 
                onChange={props.onChange} 
                className="border-solid border border-gray-300 rounded-md my-2 p-2 w-full" 
                type={props.type} 
                id={props.id} 
                name={props.name}
                value={props.value} 
                placeholder={props.placeholder} />
            </div>
    )
}