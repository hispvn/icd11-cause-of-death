import example from "./pages/example";
import page0 from "./pages/page0";
import page1 from "./pages/page1";
import page2 from "./pages/page2";
import page3 from "./pages/page3";
import page4 from "./pages/page4";
import page5 from "./pages/page5";
import page6 from "./pages/page6";
import page7 from "./pages/page7";
import page8 from "./pages/page8";
import page9 from "./pages/page9"

const run = (t) => {
  return [
    // example,
    page1(t),
    page2(t),
    page3(t),
    page4(t),
    page5(t),
    page6(t),
    page7(t),
    page8(t),
    page9(t),
    // page0
  ];
};

export default run;
