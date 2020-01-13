import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import TasksContextProvider from "./contexts/TasksContext";
import ProjectsContextProvider from "./contexts/ProjectsContext";
import ColorsContextProvider from "./contexts/ColorsContext";

import "./css/styles.css";

function Index() {
  return (
    <TasksContextProvider>
      <ProjectsContextProvider>
        <ColorsContextProvider>
          <App />
        </ColorsContextProvider>
      </ProjectsContextProvider>
    </TasksContextProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);
