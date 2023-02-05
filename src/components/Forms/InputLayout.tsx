import { Label } from "flowbite-react";

type TProps = {
    children?: string | JSX.Element | JSX.Element[];
    value: string;
}

export default function InputLayout(props: TProps) {
    return <div className='mt-2'>
        <div className="mb-2 block">
            <Label htmlFor="g" value={props.value} className="text-lg" />
        </div>
        {props.children}
    </div>
}