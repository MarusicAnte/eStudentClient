import React from "react";

interface ICheckBoxInputProps {
    name: string
    checked: boolean
    onChange: () => void;
}

export const CheckBoxInput: React.FC<ICheckBoxInputProps> = ({ name, checked, onChange }) => {
    return (
        <div className="w-fit mb-[6%] hover: cursor-pointer">
            <input id={name} type="checkbox" checked={checked} onChange={onChange} className="mr-4 w-4 h-4 hover: cursor-pointer" />
            <label htmlFor={name} className="text-md hover: cursor-pointer">{name}</label>
        </div>
    );
}