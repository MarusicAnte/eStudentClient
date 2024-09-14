import React, { useEffect, useState } from "react";
import { FilterContainer } from "../containers/FilterContainer";
import { CheckBoxInput } from "../inputs/CheckBoxInput";
// import { useUserContext } from "../context/UserContext";
import { fetchCollegeDepartments } from "../../Services/departments/departmentsService";
import { fetchAllRoles } from "../../Services/roles/rolesService";
import { fetchAllSubjects } from "../../Services/subjects/subjectsService";

interface IUsersFilterProps {
    selectedFilterOptions: IUserFilterOptions,
    setSelectedFilterOptions: React.Dispatch<React.SetStateAction<IUserFilterOptions>>
}

export const UsersFilter: React.FC<IUsersFilterProps> = ({ selectedFilterOptions, setSelectedFilterOptions }) => {


    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const [roles, setRoles] = useState<IRole[]>([]);
    const [subjects, setSubjects] = useState<ISubject[]>([]);

    // const { user } = useUserContext();

    useEffect(() => {
        // if (!user)
        //     return;

        const loadFilterOptions = async () => {
            try {
                const departmentsData: IDepartment[] = await fetchCollegeDepartments();
                const rolesData: IRole[] = await fetchAllRoles();
                const subjectData: ISubject[] = await fetchAllSubjects(null, null);

                setDepartments(departmentsData);
                setRoles(rolesData);
                setSubjects(subjectData);
            } catch (error) {
                console.log("Load filter options error: ", error);
            }
        }

        loadFilterOptions();
    }, [])


    const handleDepartmentChange = (department: string) => {
        setSelectedFilterOptions((prev) => ({
            ...prev,
            departments: prev.departments.includes(department)
                ? prev.departments.filter(dep => dep !== department)
                : [...prev.departments, department]
        }));
    };


    const handleRoleChange = (role: string) => {
        setSelectedFilterOptions((prev) => ({
            ...prev,
            roles: prev.roles.includes(role)
                ? prev.roles.filter(r => r !== role)
                : [...prev.roles, role]
        }));
    };

    const handleSubjectChange = (subject: string) => {
        setSelectedFilterOptions((prev) => ({
            ...prev,
            subjects: prev.subjects.includes(subject)
                ? prev.subjects.filter(r => r !== subject)
                : [...prev.subjects, subject]
        }));
    };

    return (
        <div>
            <FilterContainer name="Role">
                {
                    roles.length > 0 ? (
                        roles.map(role => (
                            <CheckBoxInput
                                key={role.id}
                                name={role.name}
                                checked={selectedFilterOptions.roles.includes(role.name)}
                                onChange={() => handleRoleChange(role.name)}
                            />
                        ))
                    ) : (
                        <p>No available roles options</p>
                    )
                }
            </FilterContainer>

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

            <FilterContainer name="Subjects">
                {
                    subjects.length > 0 ? (
                        subjects.map(subject => (
                            <CheckBoxInput
                                key={subject.id}
                                name={subject.name}
                                checked={selectedFilterOptions.subjects.includes(subject.name)}
                                onChange={() => handleSubjectChange(subject.name)}
                            />
                        ))
                    ) : (
                        <p>No available subjects options</p>
                    )
                }
            </FilterContainer>

        </div>
    );
}