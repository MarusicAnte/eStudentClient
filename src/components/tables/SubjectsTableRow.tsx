import React, { useState } from "react";
import { rolesConstant } from "../../constants";
import { UpdateSubject } from "../modals/UpdateSubject";
import { deleteSubjectById } from "../../Services/subjects/subjectsService";

interface ISubjectTableRowProps {
    subject: ISubject
}

export const SubjectTableRow: React.FC<ISubjectTableRowProps> = ({ subject }) => {

    const [updateSubject, setUpdateSubject] = useState<boolean>(false);

    const handleOpenModal = () => setUpdateSubject(true);

    const handleCloseModal = () => setUpdateSubject(false);

    const getUserNamesByRole = (role: string) => {
        const users = subject.users
            .filter(user => user.role === role)
            .map(user => `${user.firstName} ${user.lastName}`)
            .join(", ");

        return (users.length !== 0) ? users : "/"
    };


    const deleteSubject = () => {
        deleteSubjectById(subject.id);
    }

    return (
        <>
            {updateSubject && <UpdateSubject onClose={handleCloseModal} subjectId={subject.id} />}

            <tr className="bg-white hover:bg-gray-100 border-b border-gray-200 text-center">
                <td className="py-4 px-4 text-sm text-gray-700 border-r border-gray-200">{subject.name}</td>
                <td className="py-4 px-4 text-sm text-gray-700 border-r border-gray-200">{subject.semester}</td>
                <td className="py-4 px-4 text-sm text-gray-700 border-r border-gray-200">{subject.ects}</td>
                <td className="py-4 px-4 text-sm text-gray-700 border-r border-gray-200">{subject.activities.map(activity => activity.name).join(", ")}</td>
                <td className="py-4 px-4 text-sm text-gray-700 border-r border-gray-200">{subject.departments.map(department => department.name).join(", ")}</td>
                <td className="py-4 px-4 text-sm text-gray-700 border-r border-gray-200">{getUserNamesByRole(rolesConstant.professor)}</td>
                <td className="py-4 px-4 text-sm text-gray-700 border-r border-gray-200">{getUserNamesByRole(rolesConstant.assistant)}</td>
                <td className="py-4 px-4 text-sm text-gray-700 border-r border-gray-200">{getUserNamesByRole(rolesConstant.student)}</td>
                <td className="py-4 px-4 text-sm text-gray-700">
                    <button onClick={handleOpenModal} className="mr-[5%]">
                        <img src="../../public/images/update-icon.png" alt="update-icon" className="w-10 h-10" />
                    </button>

                    <button onClick={deleteSubject}>
                        <img src="../../public/images/delete-icon.png" alt="delete-icon" className="w-10 h-10" />
                    </button>
                </td>
            </tr>
        </>

    );
}