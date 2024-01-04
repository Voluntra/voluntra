import axios, { AxiosError, AxiosResponse } from "axios";
import { XelloResponse } from "../../types/api";

export const getToken = async (username: string, password: string) => {
  // Payload reverse engineered from xello login page
  const payload = {
    Username: username,
    Password: password,
    SelectedLanguage: "en-US",
    remember: true,
  };

  // Make the POST request to their servers
  return await axios
    .post<XelloResponse>("https://login.xello.world/api/auth/login", payload)
    .then((res: AxiosResponse<XelloResponse, any>) => {
      // Return user object containing jwt token
      return res.data.data.jwtToken;
    })
    .catch((err: AxiosError) => {
      // Print the 'data' field in the response
      console.error(err.response.data);
    });
};
