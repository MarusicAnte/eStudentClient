import React from "react";
import LogOutButton from "../buttons/LogOutButton";
// import { useUserContext } from "../context/UserContext";

const HomeNavbar: React.FC = () => {

    // const { user } = useUserContext();

    // if (!user) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="w-full flex items-center justify-between p-2 bg-sky-200 mb-[2%] rounded-lg">
            {/* <div className="flex flex-col items-center justify-around">
                <img src={user.imageURL} alt="user-logo" className="w-20 h-20 border-2 border-black rounded-full mb-1" />
                <span className="text-lg font-bold">{user.firstName} {user.lastName}</span>
            </div> */}
            <LogOutButton />
        </div>
    );
}

export default HomeNavbar;