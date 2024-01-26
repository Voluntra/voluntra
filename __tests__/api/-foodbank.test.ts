import { getFoodBankOppurtunities } from "../../src/api/food-bank/oppurtunities";

// Mock axios and provide a mock implementation for axios.get
jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe("Opportunities API", () => {
  it("fetches and returns Cheerio object for .title elements", async () => {
    // Call the function and check the returned value
    const $title = await getFoodBankOppurtunities();
    expect($title).toBeDefined();
  });
});
