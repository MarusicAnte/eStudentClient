interface ISubject {
    id: number,
    name: string,
    semester: string,
    ects: number,
    description: string,
    users: ISubjectUsers[],
    departments: ISubjectDepartments[],
    activities: ISubjectActivity[],
    notifications: ISubjectNotifications[]
}


interface ISubjectActivity {
    id: number,
    name: string
}


interface ISubjectUsers {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: string
}


interface ISubjectDepartments {
    id: number,
    name: string
}


interface ISubjectNotifications {
    id: number,
    sender: string,
    createdTime: string,
    title: string,
    description: string,
}


interface ICreateSubjectDto {
    name: string,
    semester: string,
    ects: number | undefined,
    description: string,
    usersIds: number[],
    departmentsIds: number[],
    activityTypeIds: number[]
}


interface IUpdateSubjectDto {
    name: string,
    semester: string,
    ects: number | undefined,
    description: string,
    usersIds: number[],
    departmentsIds: number[],
    activityTypeIds: number[]
}


interface IUpdateUserIds {
    professorIds: number[],
    assistantIds: number[],
    studentIds: number[]
}

interface ICreateUserIds {
    adminId: number | undefined,
    professorIds: number[],
    assistantIds: number[],
    studentIds: number[]
}


interface ISelectOption {
    value: number;
    label: string;
}


interface IUpdateSubjectForm {
    name: string,
    semester: ISelectOption | undefined,
    ects: number,
    description: string,
    subjectActivities: ISelectOption[],
    departments: ISelectOption[],
    professors: ISelectOption[],
    assistants: ISelectOption[],
    students: ISelectOption[],
}


interface IFormSelectOptions {
    subjectActivities: ISelectOption[],
    departments: ISelectOption[],
    professors: ISelectOption[],
    assistants: ISelectOption[],
    students: ISelectOption[],
}


interface ISubjectFilterOptions {
    departments: string[],
    semesters: string[]
}