import React, { useEffect, useState } from "react";
import { CloseModalButton } from "../buttons/CloseModalButton";
import { ModalInput } from "../inputs/ModalInput";
// import { useUserContext } from "../context/UserContext";
import { fetchAllSubjects } from "../../Services/subjects/subjectsService";
import { MultiValue, SingleValue } from "react-select";
import { ModalSelectInput } from "../inputs/ModalSelectInput";
import { CreateButton } from "../buttons/CreateButton";
import { fetchUserById, updateUserById } from "../../Services/user/userService";
import Select from "react-select";
import { fetchAllRoles } from "../../Services/roles/rolesService";
import { fetchCollegeDepartments } from "../../Services/departments/departmentsService";


interface IUpdateUserProps {
    userId: number,
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

export const UpdateUser: React.FC<IUpdateUserProps> = ({ onClose, userId }) => {

    // const { user } = useUserContext();

    const [updateUserDto, setUpdateUserDto] = useState<IUpdateUserDto>(initialState);

    const [updateUser, setUpdateUser] = useState<IUser | null>();

    const [formattedRoles, setFormattedRoles] = useState<ISelectOption[]>([]);
    const [roleSelectedOptions, setRoleSelectedOption] = useState<ISelectOption>();

    const [formattedDepartments, setFormattedDepartments] = useState<ISelectOption[]>([]);
    const [departmentSelectedOptions, setDepartmentSelectedOptions] = useState<ISelectOption[]>([]);

    const [formattedSubjects, setFormattedSubjects] = useState<ISelectOption[]>([]);
    const [subjectSelectedOptions, setSubjectSelectedOptions] = useState<ISelectOption[]>([]);


    useEffect(() => {
        // if (!user)
        //     return;

        const loadUserForUpdate = async () => {
            try {
                const fetchedUser: IUser | null = await fetchUserById(userId);
                setUpdateUser(fetchedUser);

            } catch (error) {
                console.log("Load user for update error: ", error);
            }
        }

        loadUserForUpdate();
    }, [])


    useEffect(() => {
        if (!updateUser)
            return;

        const loadSelectInputOptions = async () => {
            try {
                const roles: IRole[] = await fetchAllRoles();
                const departments: IDepartment[] = await fetchCollegeDepartments();
                const subjects: ISubject[] = await fetchAllSubjects(null, null);

                const roleOptions = roles.map(role => ({
                    value: role.id,
                    label: role.name
                }));

                const departmentOptions = departments.map(department => ({
                    value: department.id,
                    label: department.name
                }));

                const subjectOptions = subjects.map(subject => ({
                    value: subject.id,
                    label: subject.name
                }));

                setFormattedRoles(roleOptions);
                setFormattedDepartments(departmentOptions);
                setFormattedSubjects(subjectOptions);
            } catch (error) {
                console.log("Load select input options error: ", error);
            }

        }

        loadSelectInputOptions();

        const selectedRole = {
            value: updateUser.role.id,
            label: updateUser.role.name
        };

        const selectedDepartments: ISelectOption[] = updateUser.departments.map(department => ({
            value: department.id,
            label: department.name
        }));

        const selectedSubjects: ISelectOption[] = updateUser.subjects.map(subject => ({
            value: subject.id,
            label: subject.name
        }))

        setRoleSelectedOption(selectedRole);
        setDepartmentSelectedOptions(selectedDepartments);
        setSubjectSelectedOptions(selectedSubjects);

    }, [updateUser])


    useEffect(() => {
        if (!updateUser)
            return;

        const updateUserObject: IUpdateUserDto = {
            firstName: updateUser.firstName,
            lastName: updateUser.lastName,
            email: updateUser.email,
            password: updateUser.password,
            imageURL: updateUser.imageURL,
            roleId: updateUser.role.id,
            departmentIds: updateUser.departments.map(department => department.id),
            subjectIds: updateUser.subjects.map(subject => subject.id)
        }

        setUpdateUserDto(updateUserObject);

    }, [updateUser])


    const handleDepartmentOption = (newValue: MultiValue<ISelectOption>) => {

        setDepartmentSelectedOptions(newValue as ISelectOption[]);

        setUpdateUserDto((prev: IUpdateUserDto) => ({
            ...prev,
            departmentIds: newValue.map(x => x.value)
        }))
    };


    const handleSubjectOption = (newValue: MultiValue<ISelectOption>) => {
        setSubjectSelectedOptions(newValue as ISelectOption[]);

        setUpdateUserDto((prev: IUpdateUserDto) => ({
            ...prev,
            subjectIds: newValue.map(x => x.value)
        }))
    };


    const handleRoleOption = (newValue: SingleValue<ISelectOption>) => {
        setRoleSelectedOption(newValue as ISelectOption);

        setUpdateUserDto((prev: IUpdateUserDto) => ({
            ...prev,
            roleId: Number(newValue?.value)
        }))
    }

    const updateUserData = (event: React.FormEvent) => {
        event.preventDefault();

        if (updateUser?.id) {
            updateUserById(updateUser.id, updateUserDto);
        } else {
            console.log("User ID is not defined, unable to update.");
        }
    }


    // console.log("Update User DTO: ", updateUserDto);

    return (
        <div className="modal-wrapper">
            <div className="modal-container">
                <form onSubmit={updateUserData} className="flex flex-col">
                    <CloseModalButton onClose={onClose} />

                    <ModalInput
                        label="First name:"
                        type="text"
                        value={updateUserDto.firstName}
                        placeholder="First Name"
                        required
                        onChange={(e) => setUpdateUserDto((prev: IUpdateUserDto) => ({
                            ...prev,
                            firstName: e.target.value
                        }))}
                    />

                    <ModalInput
                        label="Last name:"
                        type="text"
                        value={updateUserDto.lastName}
                        placeholder="Last Name"
                        required
                        onChange={(e) => setUpdateUserDto((prev: IUpdateUserDto) => ({
                            ...prev,
                            lastName: e.target.value
                        }))}
                    />

                    <ModalInput
                        label="Email:"
                        type="email"
                        value={updateUserDto.email}
                        placeholder="Email adress"
                        required
                        onChange={(e) => setUpdateUserDto((prev: IUpdateUserDto) => ({
                            ...prev,
                            email: e.target.value
                        }))}
                    />

                    <ModalInput
                        label="Password:"
                        type="text"
                        value={updateUserDto.password}
                        placeholder="Password"
                        required
                        onChange={(e) => setUpdateUserDto((prev: IUpdateUserDto) => ({
                            ...prev,
                            password: e.target.value
                        }))}
                    />

                    <ModalInput
                        label="Image:"
                        type="text"
                        value={updateUserDto.imageURL}
                        placeholder="Image url"
                        required
                        onChange={(e) => setUpdateUserDto((prev: IUpdateUserDto) => ({
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

                    <ModalSelectInput
                        id="college-departments"
                        label="College Departments"
                        options={formattedDepartments}
                        value={departmentSelectedOptions}
                        required={true}
                        onChange={handleDepartmentOption}
                    />

                    <ModalSelectInput
                        id="subjects"
                        label="Subjects"
                        options={formattedSubjects}
                        value={subjectSelectedOptions}
                        required={false}
                        onChange={handleSubjectOption}

                    />

                    <CreateButton
                        type="submit"
                        name="Update user"
                    />
                </form>
            </div>
        </div>
    );
}