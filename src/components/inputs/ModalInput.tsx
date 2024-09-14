import React from "react";

interface IModalInputProps {
    label: string;
    type: string;
    placeholder?: string;
    value: string | number | undefined;
    required: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ModalInput: React.FC<IModalInputProps> = ({ label, type, placeholder, value, required, onChange }) => {

    return (
        <div className="mb-4">
            <label className="block mb-[1%]">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                required={required}
                onChange={onChange}
                className="border border-gray-300 p-2 w-full rounded mb-[1%]"
            />
        </div>
    );
}
