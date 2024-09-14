import React from "react";

interface ILoginProps {
    name: string,
    type: string,
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}


const LoginInput: React.FC<ILoginProps> = ({ name, type, placeholder, onChange }) => {
    return (
        <div className='w-full flex flex-col'>
            <p className='mb-[5%] font-bold text-lg'>{name}:</p>
            <input
                type={type}
                placeholder={placeholder}
                className='w-full h-10 px-1 py-[2%] mb-[10%] bg-none text-black border-2 outline-none focus:outline-none rounded'
                onChange={onChange}
            />
        </div>
    );
}

export default LoginInput;