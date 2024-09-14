import axios from "axios";

const api_url = "https://localhost:7065/api/ActivityTypes";


export const fetchAllActivityTypes = async () => {
    try {
        const response = await axios.get(api_url);
        if (response.status === 200) {
            console.log("Activity types data: ", response.data);
            return response.data;
        }
    } catch (error) {
        console.log("Activity types data fetch error: ", error);
    }
}