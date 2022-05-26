import React from "react";

type Props = {
    title: string
    label: string
    placeholder: string
}
const TextInput = ({title, label, placeholder}: Props) => {

    return <div className="flex flex-col mb-5">
        <label htmlFor={title} className="ml-3 mb-1">{label}</label>
        <input type="text" name={title} placeholder={placeholder}
               className="p-4 border border-black border-2 rounded-none focus:border-4"/>
    </div>
}

export default TextInput
