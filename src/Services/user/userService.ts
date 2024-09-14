import axios from "axios"

const api_url = "https://localhost:7065/api/Users"

export const fetchAllUsers = async (departmentId: number | null, roleId: number | null | undefined, subjectId: number | null) => {
    try {
        const params = {
            roleId,
            departmentId,
            subjectId
        };

        const response = await axios.get(api_url, { params });
        if (response.status === 200) {
            console.log("Users: ", response.data);
            return response.data
        }
    } catch (error) {
        console.log("Users fetch error: ", error);
    }
}

export const fetchUserById = async (id: number) => {
    try {
        const response = await axios.get(api_url + `/${id}`);
        if (response.status === 200) {
            console.log("Response data: ", response.data);
            return response.data as IUser;
        }
    } catch (error) {
        console.error('Fetch user by id error: ', error);
    }

    return null;
}


export const postNewUser = async (createUserDto: ICreateUserDto) => {
    try {
        console.log("Sending new user data:", createUserDto);

        const response = await axios.post(api_url, createUserDto);

        console.log("Response: ", response);
    } catch (error) {
        console.log("Create new user error: ", error);
    }
}


export const updateUserById = async (userId: number | undefined, updateUserDto: IUpdateUserDto) => {
    try {
        console.log("userService updateUserDto: ", updateUserDto);

        const response = await axios.patch(api_url + `/${userId}`, updateUserDto);
        if (response.status === 200)
            console.log(`User with id ${userId} was successful updated !`, response.data);
    } catch (error) {
        console.log("User update error: ", error);
    }
}


export const deleteUserById = async (userId: number) => {
    try {
        const response = await axios.delete(api_url + `/${userId}`);
        console.log(`User with id ${userId} was successful deleted !`, response.data);

    } catch (error) {
        console.log("Delete user error: ", error);
    }
}