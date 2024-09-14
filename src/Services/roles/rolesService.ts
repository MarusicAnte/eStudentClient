import axios from "axios";

const api_url = "https://localhost:7065/api/roles";

export const fetchAllRoles = async () => {
    try {
        const response = await axios.get(api_url);
        if (response.status === 200) {
            console.log("Roles data: ", response.data)
            return response.data;
        }
    } catch (error) {
        console.log("Fetch all roles error: ", error);
    }
}