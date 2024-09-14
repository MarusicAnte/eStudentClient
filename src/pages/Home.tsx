import React from "react";
import HomeNavbar from "../components/navbars/HomeNavbar";
import HomeSideBar from "../components/sidebars/HomeSideBar";
import { Outlet } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div className="w-full h-full p-[2%]">
            <HomeNavbar />

            <div className="w-full flex gap-4">
                <HomeSideBar />
                <div className="w-full bg-sky-200 rounded-lg p-[1%]">
                    <Outlet />
                </div>
            </div>

        </div>
    );
}

export default Home;