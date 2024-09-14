import React from "react";

const LoginHeader: React.FC = () => {
    return (
        <div className='w-full flex flex-col mb-[8%] items-center'>
            <img src="../../public/images/login-icon.png" alt="login-logo" className="w-32 h-32" />
            <p className='text-xl mb-[2%] text-center'>Welcome back ! Please enter your details.</p>
        </div>
    );
}

export default LoginHeader;