import React from "react";

interface IOpenModalButtonProps {
    type?: "submit" | "reset" | "button"
    imgURL: string,
    alt: string,
    openModal: () => void
}

export const OpenModalButton: React.FC<IOpenModalButtonProps> = ({ type, imgURL, alt, openModal }) => {
    return (
        <button
            type={type}
            onClick={openModal}
            className="bg-green-400 w-fit p-[1%] flex items-center rounded-full"
        >
            <img
                src={imgURL}
                alt={alt}
                className="w-8 h-8" />
        </button>
    );
}