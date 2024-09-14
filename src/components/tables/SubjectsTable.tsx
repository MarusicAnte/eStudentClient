import React from "react";
import { SubjectTableRow } from "./SubjectsTableRow";

interface ISubjectTableProps {
    subjects: ISubject[];
}

export const SubjectTable: React.FC<ISubjectTableProps> = ({ subjects }) => {
    return (
        <table className="max-w-max h-fit bg-white border border-gray-200 shadow-lg">
            <thead>
                <tr className="bg-gray-100 text-center">
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Name</th>
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Semester</th>
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">ECTS</th>
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Activities</th>
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Departments</th>
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Professors</th>
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Assistants</th>
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Students</th>
                    <th className="w-[10%] py-3 font-semibold text-gray-600 border-r border-gray-200">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    subjects.map(subject => (
                        <SubjectTableRow
                            key={subject.id}
                            subject={subject}
                        />
                    ))
                }
            </tbody>
        </table>
    );
}