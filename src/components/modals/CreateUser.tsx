import React, { useEffect, useState } from "react";
import { CloseModalButton } from "../buttons/CloseModalButton";
import { ModalInput } from "../inputs/ModalInput";
// import { useUserContext } from "../context/UserContext";
import { fetchCollegeDepartments } from "../../Services/departments/departmentsService";
import { fetchAllSubjects } from "../../Services/subjects/subjectsService";
import { MultiValue, SingleValue } from "react-select";
import { ModalSelectInput } from "../inputs/ModalSelectInput";
import { CreateButton } from "../buttons/CreateButton";
import { postNewUser } from "../../Services/user/userService";
import { fetchAllRoles } from "../../Services/roles/rolesService";
import Select from "react-select";


interface ICreateUserProps {
    onClose: () => void
}

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    imageURL: "",
    roleId: null,
    subjectIds: [],
    departmentIds: []
}

export const CreateUser: React.FC<ICreateUserProps> = ({ onClose }) => {

    // const { user } = useUserContext();

    const [createUserDto, setCreateUserDto] = useState<ICreateUserDto>(initialState);

    const [formattedRoles, setFormattedRoles] = useState<ISelectOption[]>([]);
    const [roleSelectedOptions, setRoleSelectedOption] = useState<ISelectOption>();

    const [formattedDepartments, setFormattedDepartments] = useState<ISelectOption[]>([]);
    const [departmentSelectedOptions, setDepartmentSelectedOptions] = useState<ISelectOption[]>([]);

    const [formattedSubjects, setFormattedSubjects] = useState<ISelectOption[]>([]);
    const [subjectSelectedOptions, setSubjectSelectedOptions] = useState<ISelectOption[]>([]);


    useEffect(() => {
        // if (!user)
        //     return;

        const loadRolesAndDepartments = async () => {
            try {
                const rolesData: IRole[] = await fetchAllRoles();
                const departmentData: IDepartment[] = await fetchCollegeDepartments();

                const formattedRolesData: ISelectOption[] = rolesData.map(role => ({
                    value: role.id,
                    label: role.name
                }))

                const formattedDepartmentData: ISelectOption[] = departmentData.map(department => ({
                    value: department.id,
                    label: department.name
                }));

                setFormattedRoles(formattedRolesData);
                setFormattedDepartments(formattedDepartmentData);

            } catch (error) {
                console.log("Load roles and departments error: ", error);
            }
        }

        loadRolesAndDepartments();
    }, [])


    console.log("Roles selected options: ", roleSelectedOptions);

    useEffect(() => {
        if (!departmentSelectedOptions.length) {
            setFormattedSubjects([]);
            setSubjectSelectedOptions([]);
            return;
        }

        const loadDepartmentSubjects = async () => {
            try {
                const selectedDepartmentIds = departmentSelectedOptions.map(option => option.value);

                const fetchPromises: Promise<ISubject>[] = selectedDepartmentIds.map(departmentId => fetchAllSubjects(null, departmentId));
                const results = await Promise.all(fetchPromises);

                const allSubjects = results.flat();

                const uniqueSubjects = Array.from(
                    new Map(allSubjects.map(subject => [subject.id, subject])).values()
                );

                const subjects = uniqueSubjects.map(subject => ({
                    value: subject.id,
                    label: subject.name
                }));

                setFormattedSubjects(subjects);
            } catch (error) {
                console.log("Load department subjects error: ", error);
            }
        }

        loadDepartmentSubjects();

    }, [departmentSelectedOptions])


    const handleDepartmentOption = (newValue: MultiValue<ISelectOption>) => {

        setDepartmentSelectedOptions(newValue as ISelectOption[]);

        setCreateUserDto((prev: ICreateUserDto) => ({
            ...prev,
            departmentIds: newValue.map(x => x.value)
        }))
    };


    const handleSubjectOption = (newValue: MultiValue<ISelectOption>) => {
        setSubjectSelectedOptions(newValue as ISelectOption[]);

        setCreateUserDto((prev: ICreateUserDto) => ({
            ...prev,
            subjectIds: newValue.map(x => x.value)
        }))
    };


    const handleRoleOption = (newValue: SingleValue<ISelectOption>) => {
        setRoleSelectedOption(newValue as ISelectOption);

        setCreateUserDto((prev: ICreateUserDto) => ({
            ...prev,
            roleId: Number(newValue?.value)
        }))
    }

    const createNewUser = (event: React.FormEvent) => {
        event.preventDefault();

        if (!createUserDto.firstName || !createUserDto.lastName || !createUserDto.email ||
            !createUserDto.password || !createUserDto.roleId || !createUserDto.imageURL ||
            createUserDto.departmentIds.length == 0) {
            alert("Invalid form data ! Please try again.")
            return;
        }

        postNewUser(createUserDto);
    }

    console.log("Create user dto: ", createUserDto);

    return (
        <div className="modal-wrapper">
            <div className="modal-container">
                <form onSubmit={createNewUser} className="flex flex-col">
                    <CloseModalButton onClose={onClose} />

                    <ModalInput
                        label="First name:"
                        type="text"
                        value={createUserDto.firstName}
                        placeholder="First Name"
                        required
                        onChange={(e) => setCreateUserDto((prev: ICreateUserDto) => ({
                            ...prev,
                            firstName: e.target.value
                        }))}
                    />

                    <ModalInput
                        label="Last name:"
                        type="text"
                        value={createUserDto.lastName}
                        placeholder="Last Name"
                        required
                        onChange={(e) => setCreateUserDto((prev: ICreateUserDto) => ({
                            ...prev,
                            lastName: e.target.value
                        }))}
                    />

                    <ModalInput
                        label="Email:"
                        type="email"
                        value={createUserDto.email}
                        placeholder="Email adress"
                        required
                        onChange={(e) => setCreateUserDto((prev: ICreateUserDto) => ({
                            ...prev,
                            email: e.target.value
                        }))}
                    />

                    <ModalInput
                        label="Password:"
                        type="password"
                        value={createUserDto.password}
                        placeholder="Passwrod"
                        required
                        onChange={(e) => setCreateUserDto((prev: ICreateUserDto) => ({
                            ...prev,
                            password: e.target.value
                        }))}
                    />

                    <ModalInput
                        label="Image:"
                        type="text"
                        value={createUserDto.imageURL}
                        placeholder="Image url"
                        required
                        onChange={(e) => setCreateUserDto((prev: ICreateUserDto) => ({
                            ...prev,
                            imageURL: e.target.value
                        }))}
                    />

                    <div className="mb-4">
                        <label htmlFor="roles" className="block text-base mb-[1%] font-medium text-black">
                            Roles:
                        </label>
                        <Select
                            id="roles"
                            options={formattedRoles}
                            value={roleSelectedOptions}
                            onChange={handleRoleOption}
                            required
                            className="mb-[1%]"
                        />
                    </div>

                    {/* <ModalSelectInput
                        id="college-departments"
                        label="College Departments"
                        options={formattedDepartments}
                        value={departmentSelectedOptions}
                        onChange={handleDepartmentOption}
                    />

                    <ModalSelectInput
                        id="subjects"
                        label="Subjects"
                        options={formattedSubjects}
                        value={subjectSelectedOptions}
                        onChange={handleSubjectOption}
                    /> */}

                    <CreateButton
                        type="submit"
                        name="Create user"
                    />
                </form>
            </div>
        </div>
    );
}