import axios from "axios";

const login = async () => {
  const payload = {
    Username: process.env.EXPO_PUBLIC_XELLO_USERNAME,
    Password: process.env.EXPO_PUBLIC_XELLO_PASSWORD,
    SelectedLanguage: "en-US",
    remember: true,
  };

  await axios
    .post("https://login.xello.world/api/auth/login", payload)
    .then((res) => {
      console.info(res.data.data);
      return res.data.data;
    })
    .catch((err) => {
      console.error(err);
    });
};
const getExperiences = async () => {
  const authorization = await login();
  console.log("Authorization jwt token:", authorization);

  const experienceScreenResponse = await axios
    .get("https://student.xello.world/api/experiences", {
      headers: {
        Culture: "en-US",
        Dnt: "1",
        Authorization: +authorization,
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
};

login();
