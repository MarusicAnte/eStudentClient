import React, { useEffect, useState } from "react";
import { useUserContext } from "../../components/context/UserContext";
import { fetchAllSubjects } from "../../Services/subjects/subjectsService";
import { SubjectTable } from "../../components/tables/SubjectsTable";
import { useOutletContext } from "react-router-dom";

export const MySubjects: React.FC = () => {

    const { user } = useUserContext();

    const { selectedFilterOptions } = useOutletContext<{ selectedFilterOptions: ISubjectFilterOptions }>();

    const [mySubjects, setMySubjects] = useState<ISubject[]>([]);
    const [filteredSubjects, setFilteredSubjects] = useState<ISubject[]>([]);

    useEffect(() => {
        // if (!user)
        //     return;

        const userId = user?.id;

        const loadSubjects = async () => {
            try {
                const data = await fetchAllSubjects(null, userId);

                setMySubjects(data);
                setFilteredSubjects(data);
            } catch (error) {
                console.error("Error fetching all subjects: ", error);
            }
        }

        loadSubjects();

    }, [])


    useEffect(() => {
        if (!selectedFilterOptions)
            return;

        let filteredSubjects = mySubjects;

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

    return (
        <div className="w-full h-full flex gap-4 flex-wrap">
            {mySubjects.length === 0 ? (
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