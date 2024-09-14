import React from "react";
import { NavLink } from "react-router-dom";

interface IMenuItemProps {
    imgURL: string,
    alt: string,
    name: string,
    to: string
}

const MenuItem: React.FC<IMenuItemProps> = ({ imgURL, alt, name, to }) => {
    return (
        <li className='mb-4'>
            <NavLink
                to={to}
                className={({ isActive }) => `flex items-center text-black hover:text-gray-700 ${isActive ? 'nav-link-active' : 'nav-link-noactive'}`}
            >
                <img src={imgURL} alt={alt} className='w-6 h-6 mr-2' />
                <span>{name}</span>
            </NavLink>
        </li>
    );
}

export default MenuItem;