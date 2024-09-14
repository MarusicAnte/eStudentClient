import axios from "axios";

const api_url = "https://localhost:7065/api/Departments";

export const fetchCollegeDepartments = async () => {
    try {
        const response = await axios.get(api_url);
        if (response.status === 200) {
            console.log("College Departments: ", response.data);
            return response.data;
        }
    } catch (error) {
        console.error('College departments fetch error: ', error);
    }
}



export const deleteDepartmentById = async (departmentId: number) => {
    try {
        const response = await axios.delete(api_url + `/${departmentId}`);
        if (response.status === 200)
            console.log("Deleted department: ", response.data);
    } catch (error) {
        console.log(`Delete department by id ${departmentId} error: `, error);
    }
}