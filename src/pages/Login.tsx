import React from 'react';
import BackgroundImage from '../components/ui/BackgroundImage';
import LoginForm from '../components/forms/LoginForm';
import LoginHeader from '../components/headers/LoginHeader';

const Login: React.FC = () => {
    return (
        <div className='w-full h-screen flex items-start p-[5%]'>
            <BackgroundImage />

            <div className='w-1/2 h-full bg-[#def4ff] flex flex-col align-middle px-[8%] py-[3%] border-y-2 border-r-2 border-[#e7eeff] rounded-r-3xl'>
                <LoginHeader />
                <LoginForm />
            </div>
        </div>
    );
}

export default Login;
