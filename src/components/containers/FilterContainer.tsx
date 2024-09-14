import React, { ReactNode } from "react";

interface IFilterContainerProps {
    name: string,
    children: ReactNode
}

export const FilterContainer: React.FC<IFilterContainerProps> = ({ name, children }) => {
    return (
        <div className="mb-[12%]">
            <h3 className="text-lg font-semibold mb-[4%]">{name}: </h3>
            {children}
        </div>
    );
}