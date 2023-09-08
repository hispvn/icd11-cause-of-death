import React from "react";
import { Row, Spin } from "antd";

const withLoading = (Component) => {
  return ({ loading, loaded, ...props }) => {
    if (loading) {
      return (
        <Row
          style={{
            width: "100%",
            paddingTop: 24
          }}
          justify="center"
          align="middle"
        >
          <Spin />
        </Row>
      );
    }
    if (!loaded) {
      return null;
    }
    return <Component {...props} />;
  };
};

export default withLoading;
