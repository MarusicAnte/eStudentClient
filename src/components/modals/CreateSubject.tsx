import React, { useEffect, useState } from "react";
import { CloseModalButton } from "../buttons/CloseModalButton";
import { ModalInput } from "../inputs/ModalInput";
import { CreateButton } from "../buttons/CreateButton";
import Select, { MultiValue, SingleValue } from "react-select";
import { fetchCollegeDepartments } from "../../Services/departments/departmentsService";
// import { useUserContext } from "../context/UserContext";
import { fetchAllUsers } from "../../Services/user/userService";
import { postNewSubject } from "../../Services/subjects/subjectsService";
import { rolesConstant } from "../../constants";
import { ModalSelectInput } from "../inputs/ModalSelectInput";
import { fetchAllActivityTypes } from "../../Services/activityTypes/activityTypesService";

interface ICreateSubjectProps {
    onClose: () => void;
}

const initialState = {
    name: "",
    semester: "",
    ects: 0,
    description: "",
    usersIds: [],
    departmentsIds: [],
    activityTypeIds: []
}

const initialUserIds = {
    adminId: undefined,
    professorIds: [],
    assistantIds: [],
    studentIds: []
}

const semesterOptions: ISelectOption[] = [
    {
        value: 1,
        label: "Zimski"
    },
    {
        value: 2,
        label: "Ljetni"
    }
]

export const CreateSubject: React.FC<ICreateSubjectProps> = ({ onClose }) => {

    // const { user } = useUserContext();


    const [formattedDepartments, setFormattedDepartments] = useState<ISelectOption[]>([]);
    const [departmentSelectedOptions, setDepartmentSelectedOptions] = useState<ISelectOption[]>([]);

    const [formattedProfessors, setFormattedProfessors] = useState<ISelectOption[]>([]);
    const [professorSelectedOptions, setProfessorSelectedOptions] = useState<ISelectOption[]>([]);

    const [formattedAssistants, setFormattedAssistants] = useState<ISelectOption[]>([]);
    const [assistantSelectedOptions, setAssistantSelectedOptions] = useState<ISelectOption[]>([]);

    const [formattedStudents, setFormattedStudents] = useState<ISelectOption[]>([]);
    const [studentSelectedOptions, setStudentSelectedOptions] = useState<ISelectOption[]>([]);

    const [formattedSubjectActivities, setFormattedSubjectActivities] = useState<ISelectOption[]>([]);
    const [activityTypeSelectedOptions, setActivityTypeSelectedOptions] = useState<ISelectOption[]>([]);

    const [semesterSelectedOptions, setSemesterSelectedOptions] = useState<ISelectOption>();

    const [createSubjectDto, setCreateSubjectDto] = useState<ICreateSubjectDto>(initialState)

    const [allUserIds, setAllUserIds] = useState<ICreateUserIds>(initialUserIds)


    useEffect(() => {

        // if (!user)
        //     return;

        const loadActivitesAndDepartments = async () => {
            try {
                const activitesData: IActivityType[] = await fetchAllActivityTypes();
                const departmentData: IDepartment[] = await fetchCollegeDepartments();

                const formattedActivitiesData: ISelectOption[] = activitesData.map(activityType => ({
                    value: activityType.id,
                    label: activityType.name
                }));

                const formattedDepartmentData: ISelectOption[] = departmentData.map(department => ({
                    value: department.id,
                    label: department.name
                }));

                setFormattedSubjectActivities(formattedActivitiesData);
                setFormattedDepartments(formattedDepartmentData);

            } catch (error) {
                console.log("Load departments error: ", error);
            }
        }

        loadActivitesAndDepartments();
    }, [])


    // useEffect(() => {
    //     if (user && user.role.name === rolesConstant.admin) {
    //         setAllUserIds(prev => ({
    //             ...prev,
    //             adminId: user.id
    //         }));
    //     }
    // }, [user]);


    useEffect(() => {
        if (!departmentSelectedOptions) {
            return;
        }

        const loadDepartmentUsers = async () => {
            try {
                const selectedDepartmentIds = departmentSelectedOptions.map(option => option.value);

                const fetchPromises: Promise<IUser>[] = selectedDepartmentIds.map(departmentId => fetchAllUsers(departmentId, null, null));
                const results = await Promise.all(fetchPromises);

                const allUsers = results.flat();

                const uniqueUsers = Array.from(
                    new Map(allUsers.map(user => [user.id, user])).values()
                );

                const professorsArray = uniqueUsers.filter(user => user.role.name === rolesConstant.professor);
                const assistantsArray = uniqueUsers.filter(user => user.role.name === rolesConstant.assistant);
                const studentsArray = uniqueUsers.filter(user => user.role.name === rolesConstant.student);

                const professors = professorsArray.map(professor => ({
                    value: professor.id,
                    label: `${professor.firstName} ${professor.lastName}`
                }));

                const assistants = assistantsArray.map(assistant => ({
                    value: assistant.id,
                    label: `${assistant.firstName} ${assistant.lastName}`
                }));

                const students = studentsArray.map(student => ({
                    value: student.id,
                    label: `${student.firstName} ${student.lastName}`
                }));

                setFormattedProfessors(professors);
                setFormattedAssistants(assistants);
                setFormattedStudents(students);

            } catch (error) {
                console.log("Load department users error: ", error);
            }
        };

        loadDepartmentUsers();

    }, [departmentSelectedOptions]);


    useEffect(() => {
        if (!allUserIds)
            return;

        const allIds = [...allUserIds.professorIds, ...allUserIds.assistantIds, ...allUserIds.studentIds];

        if (allUserIds.adminId) {
            allIds.push(allUserIds.adminId);
        }

        setCreateSubjectDto((prev: ICreateSubjectDto) => ({
            ...prev,
            usersIds: allIds
        }))

    }, [allUserIds])


    const handleSemesterOption = (newValue: SingleValue<ISelectOption>) => {

        setSemesterSelectedOptions(newValue as ISelectOption);

        setCreateSubjectDto((prev: ICreateSubjectDto) => ({
            ...prev,
            semester: String(newValue?.label)
        }))
    };


    const handleSubjectActivityOption = (newValue: MultiValue<ISelectOption>) => {

        setActivityTypeSelectedOptions(newValue as ISelectOption[]);

        setCreateSubjectDto((prev: ICreateSubjectDto) => ({
            ...prev,
            activityTypeIds: newValue.map(x => x.value)
        }))
    };


    const handleDepartmentOption = (newValue: MultiValue<ISelectOption>) => {

        setDepartmentSelectedOptions(newValue as ISelectOption[]);

        setCreateSubjectDto((prev: ICreateSubjectDto) => ({
            ...prev,
            departmentsIds: newValue.map(x => x.value)
        }))
    };


    const handleProfessorOption = (newValue: MultiValue<ISelectOption>) => {

        setProfessorSelectedOptions(newValue as ISelectOption[]);

        setAllUserIds(prev => ({
            ...prev,
            professorIds: newValue.map(x => x.value)
        }))
    };


    const handleAssistantOption = (newValue: MultiValue<ISelectOption>) => {

        setAssistantSelectedOptions(newValue as ISelectOption[]);

        setAllUserIds(prev => ({
            ...prev,
            assistantIds: newValue.map(x => x.value)
        }))
    };


    const handleStudentOption = (newValue: MultiValue<ISelectOption>) => {

        setStudentSelectedOptions(newValue as ISelectOption[]);

        setAllUserIds(prev => ({
            ...prev,
            studentIds: newValue.map(x => x.value)
        }))
    };


    console.log("Created subject DTO: ", createSubjectDto);


    const createNewSubject = () => {
        if (!createSubjectDto.name || !createSubjectDto.semester || !createSubjectDto.ects ||
            !createSubjectDto.description || createSubjectDto.departmentsIds.length == 0 || createSubjectDto.usersIds.length == 0) {
            alert("Invalid form data ! Please try again.")
            return;
        }

        postNewSubject(createSubjectDto);
    }


    return (
        <div className="modal-wrapper">
            <div className="modal-container">
                <form onSubmit={createNewSubject} className="flex flex-col">
                    <CloseModalButton onClose={onClose} />

                    <ModalInput
                        label="Subject name:"
                        type="text"
                        value={createSubjectDto.name}
                        placeholder="Subject name"
                        required
                        onChange={(e) => setCreateSubjectDto((prev: ICreateSubjectDto) => ({
                            ...prev,
                            name: e.target.value
                        }))}
                    />

                    <div className="mb-4">
                        <label htmlFor="semesters" className="block text-base mb-[1%] font-medium text-black">
                            Semester:
                        </label>
                        <Select
                            id="semester"
                            options={semesterOptions}
                            value={semesterSelectedOptions}
                            onChange={handleSemesterOption}
                            required
                            className="mb-[1%]"
                        />
                    </div>


                    <ModalInput
                        label="ECTS:"
                        type="number"
                        value={createSubjectDto.ects}
                        required
                        onChange={(e) => setCreateSubjectDto((prev: ICreateSubjectDto) => ({
                            ...prev,
                            ects: Number(e.target.value)
                        }))}
                    />

                    <ModalInput
                        label="Description:"
                        type="text"
                        value={createSubjectDto.description}
                        placeholder="Description"
                        required
                        onChange={(e) => setCreateSubjectDto((prev: ICreateSubjectDto) => ({
                            ...prev,
                            description: e.target.value
                        }))}
                    />

                    <ModalSelectInput
                        id="activity-types"
                        label="Subject activities"
                        options={formattedSubjectActivities}
                        value={activityTypeSelectedOptions}
                        required={true}
                        onChange={handleSubjectActivityOption}
                    />

                    <ModalSelectInput
                        id="college-departments"
                        label="College Departments"
                        options={formattedDepartments}
                        value={departmentSelectedOptions}
                        required={true}
                        onChange={handleDepartmentOption}
                    />

                    <ModalSelectInput
                        id="professors"
                        label="Professors"
                        options={formattedProfessors}
                        value={professorSelectedOptions}
                        required={true}
                        onChange={handleProfessorOption}

                    />

                    <ModalSelectInput
                        id="assistants"
                        label="Assistants"
                        options={formattedAssistants}
                        value={assistantSelectedOptions}
                        required={false}
                        onChange={handleAssistantOption}

                    />

                    <ModalSelectInput
                        id="students"
                        label="Students"
                        options={formattedStudents}
                        value={studentSelectedOptions}
                        required={false}
                        onChange={handleStudentOption}

                    />

                    <CreateButton
                        type="submit"
                        name="Create subject"
                    />
                </form>
            </div>
        </div>
    );
}
