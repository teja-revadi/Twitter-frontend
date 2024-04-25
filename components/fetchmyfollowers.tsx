import { token } from "./token";
import apis from "./apis";
import { Data } from "./datainterface";

// for fetching My followers and rendering using setData
export async function fetchMyfollowers(setData: React.Dispatch<React.SetStateAction<Data[]>>) {
  const apiUrl: string = `${apis.userprofiles}my_followers/`;

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
