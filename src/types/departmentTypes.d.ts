interface IDepartment {
    id: number,
    name: string,
    description: string,
    users: IDepartmentUsers[],
    subjects: IDepartmentSubjects[]
}

interface IDepartmentUsers {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: string
}

interface IDepartmentSubjects {
    id: number,
    name: string,
    semester: string,
    ects: number
}