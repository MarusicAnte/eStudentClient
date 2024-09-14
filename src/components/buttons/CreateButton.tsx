import React from "react";

interface ICreateButtonProps {
    type?: "submit" | "reset" | "button"
    name: string
}

export const CreateButton: React.FC<ICreateButtonProps> = ({ name, type }) => {
    return (
        <button
            type={type}
            className="bg-blue-500 text-white p-2 rounded w-fit self-center mt-[4%]"
        >
            {name}
        </button>
    );
}

