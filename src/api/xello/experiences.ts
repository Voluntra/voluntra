import axios, { AxiosError, AxiosResponse } from "axios";
import dotenv from "dotenv";
import { Experiences, PostExperiences, XelloResponse } from "../../types/api";
import { getToken } from "./token";

// Load environment variables
dotenv.config();

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

export const getExperiences = async () => {
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

const addToExperiences = async (
  jwtToken: XelloResponse["data"]["jwtToken"]
) => {
  if (!jwtToken) throw new Error("No JWT token provided");

  const payload: PostExperiences = {
    experience: "Test Experience",
    organization: "",
    city: "",
    stateProvince: "",
    country: "",
    formattedAddress: "",
    liked: "",
    disliked: "",
    learned: "",
    isOngoing: false,
    experienceCategoryId: "volunteer",
    startDate: "2021-01-01",
    endDate: "2021-02-28",
    serviceHour: 0,
  };

  await axios
    .post("https://student.xello.world/api/experiences/volunteer", payload, {
      headers: {
        authorization: jwtToken,
      },
    })
    .then((res: AxiosResponse<Experiences[], any>) => {
      console.log("Succesfully added experience");
    })
    .catch((err: AxiosError) => {
      console.error(err);
    });
};

export const postExperiences = async () => {
  await getToken(
    process.env.EXPO_PUBLIC_XELLO_USERNAME,
    process.env.EXPO_PUBLIC_XELLO_PASSWORD
  )
    .then((res) => {
      if (!res) throw new Error("No JWT token");

      addToExperiences(res);
    })
    .catch((err) => {
      console.error("Login failed");
      console.error(err);
    });
};
