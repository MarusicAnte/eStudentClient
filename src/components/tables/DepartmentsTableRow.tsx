import React, { useState } from "react";
import { UpdateUser } from "../modals/UpdateUser";
import { deleteUserById } from "../../Services/user/userService";
import { rolesConstant } from "../../constants";
import { deleteDepartmentById } from "../../Services/departments/departmentsService";

interface IDepartmentsTableRow {
    department: IDepartment
}


export const DepartmentsTableRow: React.FC<IDepartmentsTableRow> = ({ department }) => {

    const [updateUser, setUpdateUser] = useState<boolean>(false);

    const handleOpenModal = () => setUpdateUser(true);

    const handleCloseModal = () => setUpdateUser(false);

    const getUserNamesByRole = (role: string) => {
        const users = department.users
            .filter(user => user.role === role)
            .map(user => `${user.firstName} ${user.lastName}`)
            .join(", ");

        return (users.length !== 0) ? users : "/"
    };

    const deleteDepartment = () => {
        deleteDepartmentById(department.id);
    }

    return (
        <>
            {/* {updateUser && <UpdateUser onClose={handleCloseModal} userId={user.id} />} */}

            <tr className="bg-white hover:bg-gray-100 border-b border-gray-200 text-center">
                <td className="py-4 px-4 text-sm text-gray-700 border-r border-gray-200">{department.name}</td>
                <td className="py-4 px-4 text-sm text-gray-700 border-r border-gray-200">{department.description}</td>
                <td className="py-4 px-4 text-sm text-gray-700 border-r border-gray-200">{department.subjects.map(subject => subject.name).join(", ")}</td>
                <td className="py-4 px-4 text-sm text-gray-700 border-r border-gray-200">{getUserNamesByRole(rolesConstant.professor)}</td>
                <td className="py-4 px-4 text-sm text-gray-700 border-r border-gray-200">{getUserNamesByRole(rolesConstant.assistant)}</td>
                <td className="py-4 px-4 text-sm text-gray-700 border-r border-gray-200">{getUserNamesByRole(rolesConstant.student)}</td>
                <td className="py-4 px-4 text-sm text-gray-700">
                    <button onClick={handleOpenModal} className="mr-[5%]">
                        <img src="../../public/images/update-icon.png" alt="update-icon" className="w-10 h-10" />
                    </button>

                    <button onClick={deleteDepartment}>
                        <img src="../../public/images/delete-icon.png" alt="delete-icon" className="w-10 h-10" />
                    </button>
                </td>
            </tr>
        </>

    );
}