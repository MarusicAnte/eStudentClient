import React, { useEffect, useState } from "react";
import { FilterContainer } from "../containers/FilterContainer";
import { CheckBoxInput } from "../inputs/CheckBoxInput";
import { semestersConstant } from "../../constants";
// import { useUserContext } from "../context/UserContext";
import { fetchCollegeDepartments } from "../../Services/departments/departmentsService";

interface ISubjectFilterProps {
    selectedFilterOptions: ISubjectFilterOptions,
    setSelectedFilterOptions: React.Dispatch<React.SetStateAction<ISubjectFilterOptions>>
}

export const SubjectsFilter: React.FC<ISubjectFilterProps> = ({ selectedFilterOptions, setSelectedFilterOptions }) => {

    const [departments, setDepartments] = useState<IDepartment[]>([]);

    // const { user } = useUserContext();

    useEffect(() => {
        // if (!user)
        //     return;

        const loadDepartments = async () => {
            try {
                const departmentsData: IDepartment[] = await fetchCollegeDepartments();
                setDepartments(departmentsData);
            } catch (error) {
                console.log("Load departments error: ", error);
            }
        }

        loadDepartments();
    }, [])

    const handleDepartmentChange = (department: string) => {
        setSelectedFilterOptions(prev => ({
            ...prev,
            departments: prev.departments.includes(department)
                ? prev.departments.filter(dep => dep !== department)
                : [...prev.departments, department]
        }));
    };

    const handleSemesterChange = (semester: string) => {
        setSelectedFilterOptions(prev => ({
            ...prev,
            semesters: prev.semesters.includes(semester)
                ? prev.semesters.filter(sem => sem !== semester)
                : [...prev.semesters, semester]
        }));
    };


    return (
        <div>
            <FilterContainer name="Department">
                {
                    departments.length > 0 ? (
                        departments.map(department => (
                            <CheckBoxInput
                                key={department.id}
                                name={department.name}
                                checked={selectedFilterOptions.departments.includes(department.name)}
                                onChange={() => handleDepartmentChange(department.name)}
                            />
                        ))
                    ) : (
                        <p>No available department options</p>
                    )
                }
            </FilterContainer>

            <FilterContainer name="Semester">
                <CheckBoxInput
                    name={semestersConstant.zimski}
                    checked={selectedFilterOptions.semesters.includes(semestersConstant.zimski)}
                    onChange={() => handleSemesterChange(semestersConstant.zimski)}
                />
                <CheckBoxInput
                    name={semestersConstant.ljetni}
                    checked={selectedFilterOptions.semesters.includes(semestersConstant.ljetni)}
                    onChange={() => handleSemesterChange(semestersConstant.ljetni)}
                />
            </FilterContainer>
        </div>
    );
};
