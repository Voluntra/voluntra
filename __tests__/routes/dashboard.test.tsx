import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import Dashboard from "../../src/app/dashboard";

describe("<Dashboard />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<Dashboard />).toJSON();
    expect((tree as ReactTestRendererJSON).children.length).toBe(1);
  });
});

it("renders correctly", () => {
  const tree = renderer.create(<Dashboard />).toJSON();
  expect(tree).toMatchSnapshot();
});

