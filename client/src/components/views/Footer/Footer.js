import React from "react";
import { SkinOutlined } from "@ant-design/icons";

function Footer() {
  return (
    <div
      style={{
        height: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
      }}
    >
      <p>
        OOTD by Dongit <SkinOutlined />
      </p>
    </div>
  );
}

export default Footer;
