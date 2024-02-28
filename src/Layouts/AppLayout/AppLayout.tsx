import { Layout } from "antd";
import React from "react";
import { HeaderLayout } from "../HeaderLayout/HeaderLayout";
import { ContentLayout } from "../ContentLayout/ContentLayout";

export const AppLayout = () => {
  return (
    <Layout>
      <HeaderLayout />
      <Layout>
        <ContentLayout />
      </Layout>
    </Layout>
  );
};
