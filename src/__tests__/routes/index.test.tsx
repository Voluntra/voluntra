import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import App from "../../app";

describe("<App />", () => {
  it("has at least 1 child", () => {
    const tree = renderer.create(<App />).toJSON() as ReactTestRendererJSON;
    expect(tree.children?.length).toBeGreaterThan(0);
  });
});
