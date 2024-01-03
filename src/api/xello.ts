import axios, { AxiosError, AxiosResponse } from "axios";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

interface XelloResponse {
  data: Login;
}

export interface Login {
  url: string;
  isMustResetPassword: boolean;
  userAccountId: number;
  jwtToken: string;
  userType: number;
  grade: number;
  isSource: boolean;
}

interface Experiences {
  id: number;
  experienceCategoryId: string;
  experience: string;
  organization: string;
  city: string;
  stateProvince: string;
  country: string;
  formattedAddress: string;
  startDate: string;
  endDate: string;
  isOngoing: boolean;
  liked: string;
  disliked: string;
  learned: string;
  serviceHour: number;
  showInResume: boolean;
  resumeNotes: any;
}

const getToken = async (username: string, password: string) => {
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

const experiences = async (jwtToken: XelloResponse["data"]["jwtToken"]) => {
  if (!jwtToken) throw new Error("No JWT token provided");

  await axios
    .get("https://student.xello.world/api/experiences", {
      headers: {
        Culture: "en-US",
        Dnt: "1",
        Authorization: jwtToken,
      },
    })
    .then((res: AxiosResponse<Experiences[], any>) => {
      console.log("Succesfully retrieved experiences");
      res.data.map((experience) => {
        console.table(experience);
      });
    })
    .catch((err: AxiosError) => {
      console.error(err);
    });
};

const getExperiences = async () => {
  await getToken(
    process.env.EXPO_PUBLIC_XELLO_USERNAME,
    process.env.EXPO_PUBLIC_XELLO_PASSWORD
  )
    .then((res) => {
      if (!res) throw new Error("No JWT token provided");

      experiences(res);
    })
    .catch((err) => {
      console.error("Login failed");
      console.error(err);
    });
};

getExperiences();
