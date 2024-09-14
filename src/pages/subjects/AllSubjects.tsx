import React, { useEffect, useState } from "react";
import { fetchAllSubjects } from "../../Services/subjects/subjectsService";
import { SubjectTable } from "../../components/tables/SubjectsTable";
import { useOutletContext } from "react-router-dom";


export const AllSubjects: React.FC = () => {

    const { selectedFilterOptions } = useOutletContext<{ selectedFilterOptions: ISubjectFilterOptions }>();

    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [filteredSubjects, setFilteredSubjects] = useState<ISubject[]>([]);


    useEffect(() => {
        // if (!user)
        //     return;

        const loadSubjects = async () => {
            try {
                const data = await fetchAllSubjects(null, null);

                setSubjects(data);
                setFilteredSubjects(data);
            } catch (error) {
                console.error("Load subjects error: ", error);
            }
        }

        loadSubjects();

    }, [])


    useEffect(() => {
        if (!selectedFilterOptions)
            return;

        let filteredSubjects = subjects;

        if (selectedFilterOptions.departments.length > 0) {
            filteredSubjects = filteredSubjects.filter(subject =>
                subject.departments.some(department =>
                    selectedFilterOptions.departments.includes(department.name)
                )
            );
        }

        if (selectedFilterOptions.semesters.length > 0) {
            filteredSubjects = filteredSubjects.filter(subject =>
                selectedFilterOptions.semesters.includes(subject.semester)
            );
        }

        setFilteredSubjects(filteredSubjects);
    }, [selectedFilterOptions]);



    console.log("Filtered Subjects: ", filteredSubjects);

    return (
        <div className="w-full h-full">
            {subjects.length === 0 ? (
                <p>No subjects available</p>
            ) : (
                <SubjectTable
                    subjects={filteredSubjects}
                />
            )
            }
        </div>
    );
}