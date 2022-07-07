import React from "react";

type Props = {
    title: string
    label: string
    placeholder: string
    isLoading?: boolean
    handleChange?: Function
}
const TextInput = ({title, label, placeholder, isLoading, handleChange}: Props) => {

    return <div className="flex flex-col mb-5">
        <label htmlFor={title} className="ml-3 mb-1">{label}</label>
        <div className="relative">

            <input type="text" name={title} placeholder={placeholder}
                   onChange={(e) => handleChange(e)}
                   className="p-4 pr-12 block w-full border border-black border-2 rounded-none focus:border-4"/>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {isLoading && <span className="text-blue-500 text-sm animate-pulse">on cherche…</span>}
            </div>
        </div>
    </div>
}

export default TextInput
