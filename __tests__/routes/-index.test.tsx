import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import App from "../../src/app";

jest.mock("burnt", () => {
  return {
    toast: jest.fn(),
    alert: jest.fn(),
  };
});

jest.mock("react-native-ios-context-menu", () => {
  return {
    ContextMenuView: "View",
  };
});

describe("<App />", () => {
  it("has children", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(
      (tree as ReactTestRendererJSON).children.length
    ).toBeGreaterThanOrEqual(1);
  });
});

it("renders correctly", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
