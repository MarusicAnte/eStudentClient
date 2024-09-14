import React, { useEffect, useState } from "react";
import { CloseModalButton } from "../buttons/CloseModalButton";
import { ModalInput } from "../inputs/ModalInput";
import Select, { MultiValue, SingleValue } from "react-select";
import { ModalSelectInput } from "../inputs/ModalSelectInput";
import { CreateButton } from "../buttons/CreateButton";
// import { useUserContext } from "../context/UserContext";
import { fetchSubjectById, updateSubjectById } from "../../Services/subjects/subjectsService";
import { rolesConstant } from "../../constants";
import { fetchAllUsers } from "../../Services/user/userService";
import { fetchCollegeDepartments } from "../../Services/departments/departmentsService";
import { fetchAllActivityTypes } from "../../Services/activityTypes/activityTypesService";

interface IUpdateSubjectProps {
    subjectId: number;
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
    professorIds: [],
    assistantIds: [],
    studentIds: []
}

const initialSelectedFormData = {
    name: "",
    semester: { value: 0, label: "" },
    ects: 0,
    description: "",
    subjectActivities: [],
    departments: [],
    professors: [],
    assistants: [],
    students: [],
}

const initialFormSelectOptions = {
    subjectActivities: [],
    departments: [],
    professors: [],
    assistants: [],
    students: [],
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



export const UpdateSubject: React.FC<IUpdateSubjectProps> = ({ subjectId, onClose }) => {

    // const { user } = useUserContext();

    const [updateSubject, setUpdateSubject] = useState<ISubject>();
    const [updateSubjectDto, setUpdateSubjectDto] = useState<IUpdateSubjectDto>(initialState);
    const [allUserIds, setAllUserIds] = useState<IUpdateUserIds>(initialUserIds);
    const [activityTypes, setActivityTypes] = useState<IActivityType[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const [formSelectOptions, setFormSelectOptions] = useState<IFormSelectOptions>(initialFormSelectOptions)

    const [selectedFormData, setSelectedFormData] = useState<IUpdateSubjectForm>(initialSelectedFormData);



    useEffect(() => {
        // if (!user)
        //     return;

        const loadSubjectForUpdate = async () => {
            try {
                const subject: ISubject = await fetchSubjectById(subjectId);
                setUpdateSubject(subject);
            } catch (error) {
                console.log("Load subject for update error: ", error);
            }
        }

        loadSubjectForUpdate();

    }, [])


    useEffect(() => {
        if (!updateSubject)
            return;

        const loadSelectInputOptions = async () => {
            try {
                const activitiesData: IActivityType[] = await fetchAllActivityTypes();
                const users: IUser[] = await fetchAllUsers(null, null, null);
                const departments: IDepartment[] = await fetchCollegeDepartments();

                setActivityTypes(activitiesData);
                setUsers(users);
                setDepartments(departments);

            } catch (error) {
                console.log("Load users and departments error: ", error);
            }
        }

        loadSelectInputOptions();
    }, [updateSubject])


    console.log("Updated subject: ", updateSubject);

    useEffect(() => {
        if (!departments)
            return;

        const departmentsOptions = departments.map(department => ({
            value: department.id,
            label: department.name
        }));

        setFormSelectOptions(prev => ({
            ...prev,
            departments: departmentsOptions
        }))

    }, [departments])


    useEffect(() => {
        if (!updateSubject)
            return;

        const updatedSubjectObject = {
            name: updateSubject.name,
            semester: updateSubject.semester,
            ects: updateSubject.ects,
            description: updateSubject.description,
            usersIds: updateSubject.users.map(user => user.id),
            departmentsIds: updateSubject.departments.map(department => department.id),
            activityTypeIds: updateSubject.activities.map(activityType => activityType.id)
        }

        setUpdateSubjectDto(updatedSubjectObject);
        setAllUserIds({
            professorIds: updateSubject.users
                .filter(user => user.role === rolesConstant.professor)
                .map(user => user.id),
            assistantIds: updateSubject.users
                .filter(user => user.role === rolesConstant.assistant)
                .map(user => user.id),
            studentIds: updateSubject.users
                .filter(user => user.role === rolesConstant.student)
                .map(user => user.id)
        });


        const selectedSemester = semesterOptions.find(option => option.label === updateSubject.semester);

        const selectedSubjectActivities = updateSubject.activities.map(activity => ({
            value: activity.id,
            label: activity.name
        }))

        const selectedDepartments = updateSubject.departments.map(department => ({
            value: department.id,
            label: department.name
        }));

        const selectedProfessors = updateSubject.users.filter(user => user.role === rolesConstant.professor)
            .map(professor => ({
                value: professor.id,
                label: professor.firstName + " " + professor.lastName
            }));

        const selectedAssistants = updateSubject.users.filter(user => user.role === rolesConstant.assistant)
            .map(assistant => ({
                value: assistant.id,
                label: assistant.firstName + " " + assistant.lastName
            }));

        const selectedStudents = updateSubject.users.filter(user => user.role === rolesConstant.student)
            .map(student => ({
                value: student.id,
                label: student.firstName + " " + student.lastName
            }));

        setSelectedFormData({
            name: updateSubject.name,
            semester: selectedSemester,
            ects: updateSubject.ects,
            description: updateSubject.description,
            subjectActivities: selectedSubjectActivities,
            departments: selectedDepartments,
            professors: selectedProfessors,
            assistants: selectedAssistants,
            students: selectedStudents
        });

    }, [updateSubject])


    useEffect(() => {
        if (!allUserIds)
            return;

        const allIds = [...allUserIds.professorIds, ...allUserIds.assistantIds, ...allUserIds.studentIds];

        setUpdateSubjectDto((prev: IUpdateSubjectDto) => ({
            ...prev,
            usersIds: allIds
        }))
    }, [allUserIds])


    useEffect(() => {

        if (!departments)
            return;

        const formattedSubjectActivityOptions = activityTypes.map(activityType => ({
            value: activityType.id,
            label: activityType.name
        }));

        const filteredUsers = users.filter(user =>
            user.departments.some(dep =>
                selectedFormData.departments.some(selectedDep => selectedDep.value === dep.id)));

        const professorOptions = filteredUsers.filter(user => user.role.name === rolesConstant.professor);
        const assistantOptions = filteredUsers.filter(user => user.role.name === rolesConstant.assistant);
        const studentOptions = filteredUsers.filter(user => user.role.name === rolesConstant.student);

        const formattedProfessorOptions = professorOptions.map(professor => ({
            value: professor.id,
            label: professor.firstName + " " + professor.lastName
        }));

        const formattedAssistantOptions = assistantOptions.map(assistant => ({
            value: assistant.id,
            label: assistant.firstName + " " + assistant.lastName
        }));

        const formattedStudentOptions = studentOptions.map(student => ({
            value: student.id,
            label: student.firstName + " " + student.lastName
        }));

        setFormSelectOptions((prev) => ({
            ...prev,
            subjectActivities: formattedSubjectActivityOptions,
            professors: formattedProfessorOptions,
            assistants: formattedAssistantOptions,
            students: formattedStudentOptions
        }))

    }, [departments])

    console.log("Update subject dto: ", updateSubjectDto);


    const handleSemesterOption = (newValue: SingleValue<ISelectOption>) => {

        setSelectedFormData(prev => ({
            ...prev,
            semester: newValue as ISelectOption
        }));

        setUpdateSubjectDto((prev: IUpdateSubjectDto) => ({
            ...prev,
            semester: String(newValue?.label)
        }))
    };


    const handleSubjectActivityOptions = (newValue: MultiValue<ISelectOption>) => {

        setSelectedFormData(prev => ({
            ...prev,
            subjectActivities: newValue as ISelectOption[]
        }));

        setUpdateSubjectDto((prev: IUpdateSubjectDto) => ({
            ...prev,
            activityTypeIds: newValue.map(x => x.value)
        }))
    };


    const handleDepartmentOption = (newValue: MultiValue<ISelectOption>) => {

        setSelectedFormData(prev => ({
            ...prev,
            departments: newValue as ISelectOption[]
        }));

        setUpdateSubjectDto((prev: IUpdateSubjectDto) => ({
            ...prev,
            departmentsIds: newValue.map(x => x.value)
        }))
    };


    const handleProfessorOption = (newValue: MultiValue<ISelectOption>) => {

        setSelectedFormData(prev => ({
            ...prev,
            professors: newValue as ISelectOption[]
        }));

        setAllUserIds((prev) => ({
            ...prev,
            professorIds: newValue.map(x => x.value)
        }));
    };

    console.log("All users ids: ", allUserIds);

    const handleAssistantOption = (newValue: MultiValue<ISelectOption>) => {

        setSelectedFormData(prev => ({
            ...prev,
            assistants: newValue as ISelectOption[]
        }));

        setAllUserIds((prev) => ({
            ...prev,
            assistantIds: newValue.map(x => x.value)
        }));
    };


    const handleStudentOption = (newValue: MultiValue<ISelectOption>) => {

        setSelectedFormData(prev => ({
            ...prev,
            students: newValue as ISelectOption[]
        }));

        setAllUserIds((prev) => ({
            ...prev,
            studentIds: newValue.map(x => x.value)
        }));
    };


    const updateSubjectData = (event: React.FormEvent) => {
        event.preventDefault();

        updateSubjectById(subjectId, updateSubjectDto);

        onClose();
    }

    return (
        <div className="modal-wrapper">
            <div className="modal-container">
                <form onSubmit={updateSubjectData} className="flex flex-col">
                    <CloseModalButton onClose={onClose} />

                    <ModalInput
                        label="Subject name:"
                        type="text"
                        value={updateSubjectDto.name}
                        placeholder="Subject name"
                        required
                        onChange={(e) => setUpdateSubjectDto((prev: IUpdateSubjectDto) => ({
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
                            value={selectedFormData.semester}
                            onChange={handleSemesterOption}
                            required
                            className="mb-[1%]"
                        />
                    </div>


                    <ModalInput
                        label="ECTS:"
                        type="number"
                        value={updateSubjectDto.ects}
                        required
                        onChange={(e) => setUpdateSubjectDto((prev: IUpdateSubjectDto) => ({
                            ...prev,
                            ects: Number(e.target.value)
                        }))}
                    />

                    <ModalInput
                        label="Description:"
                        type="text"
                        value={updateSubjectDto.description}
                        placeholder="Description"
                        required
                        onChange={(e) => setUpdateSubjectDto((prev: IUpdateSubjectDto) => ({
                            ...prev,
                            description: e.target.value
                        }))}
                    />

                    <ModalSelectInput
                        id="subject-activities"
                        label="Subject activities"
                        options={formSelectOptions.subjectActivities}
                        value={selectedFormData.subjectActivities}
                        required={true}
                        onChange={handleSubjectActivityOptions}
                    />

                    <ModalSelectInput
                        id="college-departments"
                        label="College Departments"
                        options={formSelectOptions.departments}
                        value={selectedFormData.departments}
                        required={true}
                        onChange={handleDepartmentOption}
                    />

                    <ModalSelectInput
                        id="professors"
                        label="Professors"
                        options={formSelectOptions.professors}
                        value={selectedFormData.professors}
                        required={true}
                        onChange={handleProfessorOption}

                    />

                    <ModalSelectInput
                        id="assistants"
                        label="Assistants"
                        options={formSelectOptions.assistants}
                        value={selectedFormData.assistants}
                        required={false}
                        onChange={handleAssistantOption}

                    />

                    <ModalSelectInput
                        id="students"
                        label="Students"
                        options={formSelectOptions.students}
                        value={selectedFormData.students}
                        required={false}
                        onChange={handleStudentOption}

                    />

                    <CreateButton
                        type="submit"
                        name="Update subject"
                    />
                </form>
            </div>
        </div>
    );
}