import axios from "axios";

const api_url = "https://localhost:7065/api/Notifications";

export const fetchedNotifications = async () => {
    try {
        const response = await axios.get(api_url);
        if (response.status === 200) {
            console.log("Response data: ", response.data);
            return response.data;
        }

    } catch (error) {
        console.error('Notifications fetch error: ', error);
    }
}