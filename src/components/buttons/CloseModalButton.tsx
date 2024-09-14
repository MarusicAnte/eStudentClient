import React from "react";

interface CloseModalButtonProps {
    onClose: () => void;
}

export const CloseModalButton: React.FC<CloseModalButtonProps> = ({ onClose }) => {
    return (
        <button
            className="text-gray-500 hover:text-gray-700 mb-[2%] flex self-end"
            onClick={onClose}
        >
            <svg className="w-6 h-6 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
    );
}
