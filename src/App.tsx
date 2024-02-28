import React from "react";
import "./App.css";
import { AppLayout } from "./Layouts/AppLayout/AppLayout";
import { AntConfigProvider } from "./AntdConfigProvider/AntConfigProvider";

function App() {
  return (
    <AntConfigProvider>
      <AppLayout />
    </AntConfigProvider>
  );
}

export default App;
