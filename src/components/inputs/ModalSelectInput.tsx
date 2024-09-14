import React from "react";
import Select, { MultiValue } from "react-select";

interface ISelectInputProps {
    id: string;
    label: string;
    options: ISelectOption[];
    value: ISelectOption | ISelectOption[] | undefined;
    onChange: (newValue: MultiValue<ISelectOption>) => void;
    required: boolean;
}



export const ModalSelectInput: React.FC<ISelectInputProps> = ({ id, label, options, value, onChange, required }) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-base mb-[1%] font-medium text-black">
                {label}:
            </label>
            <Select
                id={id}
                options={options}
                value={value}
                onChange={onChange}
                isMulti
                required={required}
                className="mb-[1%]"
            />
        </div>
    );
}
