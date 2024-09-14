import React from "react";

interface IRadioInputProps {
    value: string,
    checked: boolean,
    action: (event: React.ChangeEvent<HTMLInputElement>) => void
}


const RadioInput: React.FC<IRadioInputProps> = ({ value, checked, action }) => {
    return (
        <div className="mb-2 flex items-center hover:cursor-pointer">
            <input
                id={value}
                type="radio"
                value={value}
                checked={checked}
                onChange={action}
                className="mr-2 w-6 h-6 hover:cursor-pointer"
            />
            <label htmlFor={value} className="hover:cursor-pointer">
                {value}
            </label>
        </div>
    );
}

export default RadioInput;