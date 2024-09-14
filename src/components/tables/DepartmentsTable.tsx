import React from "react";
import { DepartmentsTableRow } from "./DepartmentsTableRow";

interface IDepartmentsTableProps {
    departments: IDepartment[]
}

export const DepartmentsTable: React.FC<IDepartmentsTableProps> = ({ departments }) => {
    return (
        <table className="w-full h-fit bg-white border border-gray-200 shadow-lg">
            <thead>
                <tr className="bg-gray-100 text-center">
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Name</th>
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Description</th>
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Subjects</th>
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Professors</th>
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Assistants</th>
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Students</th>
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    departments.map(department => (
                        <DepartmentsTableRow
                            key={department.id}
                            department={department}
                        />
                    ))
                }
            </tbody>
        </table>
    );
}