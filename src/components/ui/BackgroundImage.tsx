import React from 'react';

const BackgroundImage: React.FC = () => {
    return (
        <div className='relative w-1/2 h-full flex flex-col border-y-2 border-l-2 border-[#e7eeff] rounded-l-3xl'>
            <div className=' w-full absolute top-[12%] flex flex-col items-center'>
                <h1 className='text-3xl text-black font-bold mb-[4%]'>WELCOME TO UNIVERSITY APP !</h1>
                <p className='text-xl text-black font-normal'>Hurry up to login and see what's new in the app.</p>
            </div>
            <img src="/images/university-logo.jpg" alt="login-logo" className='w-full h-full object-cover rounded-l-3xl' />
        </div>
    );
}

export default BackgroundImage;
