import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import Discover from "../../src/app/discover";

describe("<Discover />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<Discover />).toJSON();
    expect((tree as ReactTestRendererJSON).children.length).toBe(1);
  });
});

it("renders correctly", () => {
  const tree = renderer.create(<Discover />).toJSON();
  expect(tree).toMatchSnapshot();
});
