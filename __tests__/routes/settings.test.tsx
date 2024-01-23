import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import Settings from "../../src/app/settings";

describe("<Settings />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<Settings />).toJSON();
    expect((tree as ReactTestRendererJSON).children.length).toBe(1);
  });
});

it("renders correctly", () => {
  const tree = renderer.create(<Settings />).toJSON();
  expect(tree).toMatchSnapshot();
});
