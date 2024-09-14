import React from "react";
import { UsersTableRow } from "./UsersTableRow";

interface IUsersTableProps {
    users: IUser[]
}

export const UsersTable: React.FC<IUsersTableProps> = ({ users }) => {
    return (
        <table className="w-full h-fit bg-white border border-gray-200 shadow-lg">
            <thead>
                <tr className="bg-gray-100 text-center">
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Image</th>
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">First Name</th>
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Last Name</th>
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Role</th>
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Email</th>
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Departments</th>
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Subjects</th>
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user => (
                        <UsersTableRow
                            key={user.id}
                            user={user}
                        />
                    ))
                }
            </tbody>
        </table>
    );
}