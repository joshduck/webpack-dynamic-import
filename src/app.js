import React from "react";
import Loadable from "react-loadable";
import A from "./components/a";

export default Loadable.Map({
  loader: {
    B: () => import("./components/b"),
    C: () => import("./components/c")
  },
  loading: () => <div>Loading...</div>,
  render({ B, C }, props) {
    B = B ? B.default || B : "div";
    C = C ? C.default || C : "div";

    return (
      <div>
        <A />
        <B />
        <C />
      </div>
    );
  }
});
