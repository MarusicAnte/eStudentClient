import React from 'react';

interface ILoginButtonProps {
    type?: 'button' | 'submit' | 'reset';
}

const LoginButton: React.FC<ILoginButtonProps> = ({ type = 'button' }) => {
    return (
        <div className=''>
            <button type={type} className='bg-sky-500/75 px-5 py-2 rounded text-white font-medium border-none'>
                Log in
            </button>
        </div>
    );
}

export default LoginButton;