const generateHtmlChart = (i) => {
  return {
    i,
    children: [
      {
        type: "html",
        title: "This is a HTML chart",
        getData: () => {
          return new Promise(async (res, rej) => {
            res({
              data: (
                <div>
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                  HELLO, THIS IS AN HTML CHART
                  <br />
                </div>
              )
            });
          });
        }
      }
    ]
  };
};
export default generateHtmlChart;
