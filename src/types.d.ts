interface IUser {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    imageURL: string,
    role: IRole,
    subjects: ISubject[],
    departments: IUserDepartments[]
}

interface IRole {
    id: number,
    name: string
}

interface ICreateUserDto {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    imageURL: string,
    roleId: null | number,
    subjectIds: number[]
    departmentIds: number[],
}

interface IUpdateUserDto {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    imageURL: string,
    roleId: null | number,
    subjectIds: number[]
    departmentIds: number[],
}

interface IUserDepartments {
    id: number,
    name: string
}

interface IUserFilterOptions {
    departments: string[],
    roles: string[],
    subjects: string[]
}

interface INotifications {
    id: number,
    sender: string,
    createdTime: string,
    title: string,
    description: string,
    subjects: INotificationSubject[]
}

interface INotificationSubject {
    id: number,
    name: string,
    semester: string,
    ECTS: string
}

interface IRole {
    id: number,
    name: string
}


interface IUserIds {
    professorIds: number[],
    assistantIds: number[],
    studentIds: nubmer[]
}


interface IActivityType {
    id: number,
    name: string
}