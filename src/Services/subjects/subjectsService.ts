import axios from "axios";

const api_url = "https://localhost:7065/api/subjects";

export const fetchAllSubjects = async (departmentId: number | null, userId: number | null | undefined) => {
    try {
        const params = {
            departmentId,
            userId
        };

        const response = await axios.get(api_url, { params });
        if (response.status === 200) {
            console.log("Fetched all subjects: ", response.data);
            return response.data;
        }
    } catch (error) {
        console.error('Fetching subjects error: ', error);
    }

}


export const fetchSubjectById = async (id: number) => {
    try {
        const response = await axios.get(api_url + `/${id}`);
        if (response.status === 200) {
            console.log("Response data: ", response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}


export const postNewSubject = async (createSubjectDto: ICreateSubjectDto) => {
    try {
        const response = await axios.post(api_url, createSubjectDto);
        if (response.status === 200) {
            return "New subject successful created !";
        }
    } catch (error) {
        console.log("Create new subject error: ", error);
    }
}


export const updateSubjectById = async (subjectId: number, updateSubjectDto: IUpdateSubjectDto) => {
    try {
        const response = await axios.patch(api_url + `/${subjectId}`, updateSubjectDto);
        console.log(`Subject with id ${subjectId} successful updated !`, response.data)
    } catch (error) {
        console.log(`Update subject with id ${subjectId} error: `, error);
    }
}


export const deleteSubjectById = async (subjectId: number) => {
    try {
        const response = await axios.delete(api_url + `/${subjectId}`);
        console.log(`Subject with id ${subjectId} successful deleted !`, response.data)
    } catch (error) {
        console.log(`Delete subject with id ${subjectId} error: `, error);
    }
}