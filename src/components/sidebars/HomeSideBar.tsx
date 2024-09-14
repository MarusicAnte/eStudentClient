import React from "react";
import MenuItem from "./MenuItem";

const HomeSideBar: React.FC = () => {
    return (
        <div className='w-fit h-fit bg-sky-200 -400 p-[2%] rounded-lg'>
            <h2 className='text-2xl font-bold mb-4'>Menu</h2>
            <ul>
                <MenuItem
                    imgURL="../../public/images/notifications-icon.png"
                    alt="notifications-icon"
                    name="Notifications"
                    to="notifications"
                />
                <MenuItem
                    imgURL="../../public/images/users-icon.png"
                    alt="users-icon"
                    name="Users"
                    to="users"
                />
                <MenuItem
                    imgURL="../../public/images/departments-icon.png"
                    alt="departments-icon"
                    name="College Departments"
                    to="departments"
                />
                <MenuItem
                    imgURL="../../public/images/subjects-icon.png"
                    alt="subjects-icon"
                    name="Subjects"
                    to="subjects"
                />
                <MenuItem
                    imgURL="../../public/images/schedule-icon.png"
                    alt="schedule-icon"
                    name="Schedule"
                    to="schedule"
                />
                <MenuItem
                    imgURL="../../public/images/classrooms-icon.png"
                    alt="classrooms-icon"
                    name="Classrooms"
                    to="classrooms"
                />
            </ul>

        </div>
    );
}

export default HomeSideBar;