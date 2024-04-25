import { token } from "./token";
import apis from "./apis";
import { Data } from "./datainterface";

// for fetching all users and rendering using setData
export const fetchUsers = async (setData: React.Dispatch<React.SetStateAction<Data[]>>) => {
    const apiUrl: string = `${apis.users}accounts_to_follow/`;

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setData(data);
    } catch (error) {
        console.error("Error", error);
    }
}
