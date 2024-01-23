import { getExperiences } from "../../src/api/xello/experiences";

test("xello api is successful", async () => {
  const data = await getExperiences(); // Await the promise returned by getExperiences
  console.log(data);

  expect(data).toBeDefined(); // Use expect(data).toBeDefined() instead of expect(data).toBeTruthy()
});
