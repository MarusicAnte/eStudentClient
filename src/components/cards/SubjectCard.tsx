import React, { useEffect, useState } from "react";


export const SubjectCard: React.FC<ISubject> = ({ name, semester, ects, description, users }) => {

    const [professorName, setProfessorName] = useState<string | null>(null);

    useEffect(() => {
        if (!users)
            return;

        const professor = users.find(user => user.role === "Profesor");
        if (professor) {
            setProfessorName(professor.firstName + " " + professor.lastName);
        }

    }, [])

    return (
        <div className="w-[30%] h-[80%] bg-white rounded-lg p-[1%] shadow-lg border-4 ">
            <h2 className="font-bold text-xl mb-[3%]">{name}</h2>
            <p>Semester: {semester}</p>
            <span>ECTS: {ects}</span>
            <p>Description: {description}</p>
            <p>Professors: {professorName}</p>
        </div>
    );
}