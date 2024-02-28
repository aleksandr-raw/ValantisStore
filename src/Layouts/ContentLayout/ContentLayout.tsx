import { Content } from "antd/es/layout/layout";
import { CSSProperties } from "react";
import { ProductBoard } from "../../Components/ProductBoard/ProductBoard";

const contentStyle: CSSProperties = {
  minHeight: "calc(100vh - 60px)",
  height: "calc(100vh - 60px)",
  color: "#1b1b1b",
  backgroundColor: "#FFFFFF",
  padding: "1rem",
};

export const ContentLayout = () => {
  return (
    <Content style={contentStyle}>
      <ProductBoard />
    </Content>
  );
};
