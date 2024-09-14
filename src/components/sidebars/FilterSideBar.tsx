import React, { ReactNode } from "react";


interface IFilterProps {
    toggleFilter: () => void;
    children: ReactNode;
}

export const FilterSideBar: React.FC<IFilterProps> = ({ children, toggleFilter }) => {
    return (
        <div className="w-60 h-fit mr-4 p-[2%] rounded-md bg-white shadow-lg transition-transform duration-300">
            {children}
            <button
                className="mt-4 bg-red-600 text-white rounded-md py-2 px-4 hover:bg-red-700"
                onClick={toggleFilter}
            >
                Close
            </button>
        </div>
    );
}