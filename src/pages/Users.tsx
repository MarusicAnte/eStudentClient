import React, { useEffect, useState } from "react";
import { FilterSideBar } from "../components/sidebars/FilterSideBar";
import { UsersTable } from "../components/tables/UsersTable";
// import { useUserContext } from "../components/context/UserContext";
import { fetchAllUsers } from "../Services/user/userService";
import { UsersFilter } from "../components/filters/UsersFilter";
import { OpenModalButton } from "../components/buttons/OpenModalButton";
import { CreateUser } from "../components/modals/CreateUser";


const initialUserFilterOptions = {
    departments: [],
    roles: [],
    subjects: []
}


const Users: React.FC = () => {

    // const { user } = useUserContext();

    const [users, setUsers] = useState<IUser[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

    const [createUser, setCreateUser] = useState<boolean>(false);

    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [selectedFilterOptions, setSelectedFilterOptions] = useState<IUserFilterOptions>(initialUserFilterOptions)


    useEffect(() => {
        // if (!user)
        //     return;

        const loadUsers = async () => {
            try {
                const data = await fetchAllUsers(null, null, null);
                setUsers(data);
                setFilteredUsers(data);
            } catch (error) {
                console.error("Load subjects error: ", error);
            }
        }

        loadUsers();
    }, [])


    useEffect(() => {
        if (!selectedFilterOptions)
            return;

        let filteredUsers = users;

        if (selectedFilterOptions.roles.length > 0) {
            filteredUsers = filteredUsers.filter(user =>
                selectedFilterOptions.roles.includes(user.role.name));
        }

        if (selectedFilterOptions.departments.length > 0) {
            filteredUsers = filteredUsers.filter(user =>
                user.departments.some(userDepartment =>
                    selectedFilterOptions.departments.includes(userDepartment.name)
                )
            );
        }

        if (selectedFilterOptions.subjects.length > 0) {
            filteredUsers = filteredUsers.filter(user =>
                user.subjects.some(userSubject =>
                    selectedFilterOptions.subjects.includes(userSubject.name)
                )
            );
        }

        setFilteredUsers(filteredUsers);

    }, [selectedFilterOptions])


    console.log("Filtered Users: ", filteredUsers);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };


    const handleOpenModal = () => setCreateUser(true);

    const handleCloseModal = () => setCreateUser(false);


    return (
        <div className="w-full flex flex-col gap-2 justify-between">
            {createUser && <CreateUser onClose={handleCloseModal} />}

            <div className="flex items-center justify-between mb-4">
                <button
                    className="p-2 h-fit w-fit bg-blue-500 text-white rounded-md hover:bg-blue-700"
                    onClick={toggleFilter}
                >
                    <img src="../../public/images/filter-icon.png" alt="filter-icon" className="w-8 h-8" />
                </button>


                <OpenModalButton
                    imgURL="../../public/images/add-user-icon.png"
                    alt="add-user-icon"
                    openModal={handleOpenModal}
                />

            </div>

            <div className={`w-full flex ${isFilterOpen ? '' : 'flex-col'}`}>

                <div className={`flex-1 flex transition-all duration-300  ${isFilterOpen ? '' : 'flex-col'}`}>
                    {isFilterOpen && (
                        <FilterSideBar toggleFilter={toggleFilter}>
                            <UsersFilter
                                selectedFilterOptions={selectedFilterOptions}
                                setSelectedFilterOptions={setSelectedFilterOptions}
                            />
                        </FilterSideBar>
                    )}

                    <UsersTable
                        users={filteredUsers}
                    />
                </div>
            </div>
        </div>
    );
}

export default Users;