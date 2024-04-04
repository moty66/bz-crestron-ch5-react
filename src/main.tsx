import { ConfigProvider, theme } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Slider: {
            handleSize: 32,
            dotSize: 32,
            railSize: 16,
            controlSize: 32,
            handleLineWidthHover: 8,
            handleColorDisabled: "#1677ff",
            handleColor: "#1677ff",
          },
        },
        algorithm: theme.darkAlgorithm,
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
