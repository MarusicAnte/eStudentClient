import React, { useState } from "react";
import { UpdateUser } from "../modals/UpdateUser";
import { deleteUserById } from "../../Services/user/userService";

interface IUsersTableRowProps {
    user: IUser
}


export const UsersTableRow: React.FC<IUsersTableRowProps> = ({ user }) => {

    const [updateUser, setUpdateUser] = useState<boolean>(false);

    const handleOpenModal = () => setUpdateUser(true);

    const handleCloseModal = () => setUpdateUser(false);

    const deleteUser = () => {
        deleteUserById(user.id);
    }

    return (
        <>
            {updateUser && <UpdateUser onClose={handleCloseModal} userId={user.id} />}

            <tr className="bg-white hover:bg-gray-100 border-b border-gray-200 text-center">
                <td className="py-4 px-4 text-sm text-gray-700 border-r border-gray-200">
                    <img src={user.imageURL} alt="user-image" className="w-20 h-20 rounded-full" />
                </td>
                <td className="py-4 px-4 text-sm text-gray-700 border-r border-gray-200">{user.firstName}</td>
                <td className="py-4 px-4 text-sm text-gray-700 border-r border-gray-200">{user.lastName}</td>
                <td className="py-4 px-4 text-sm text-gray-700 border-r border-gray-200">{user.role.name}</td>
                <td className="py-4 px-4 text-sm text-gray-700 border-r border-gray-200">{user.email}</td>
                <td className="py-4 px-4 text-sm text-gray-700 border-r border-gray-200">{user.departments.map(dep => dep.name).join(", ")}</td>
                <td className="py-4 px-4 text-sm text-gray-700 border-r border-gray-200">{user.subjects.map(sub => sub.name).join(", ")}</td>
                <td className="py-4 px-4 text-sm text-gray-700">
                    <button onClick={handleOpenModal} className="mr-[5%]">
                        <img src="../../public/images/update-icon.png" alt="update-icon" className="w-10 h-10" />
                    </button>

                    <button onClick={deleteUser}>
                        <img src="../../public/images/delete-icon.png" alt="delete-icon" className="w-10 h-10" />
                    </button>
                </td>
            </tr>
        </>

    );
}