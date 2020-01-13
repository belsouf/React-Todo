import React from "react";
import { Pane, Heading, Paragraph } from "evergreen-ui";

import Navbar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import TasksList from "./components/Tasks/TasksList";
import TaskForm from "./components/Tasks/TaskForm";

import "./css/styles.css";

function App() {
  const bgColor = "blueTint";

  const styles = {
    container: {
      display: "flex",
      alignItems: "stretch",
      height: "100%"
    },
    contentContainer: {
      width: "55%",
      minHeight: "100%",
      display: "block",
      borderRight: "1px solid #E4E7EB"
    },
    emptyLeftContainer: {
      width: "15%",
      minHeight: "100%",
      display: "block"
    }
  };
  return (
    <div className="App">
      <Navbar />
      <Pane style={styles.container}>
        <SideBar />
        <Pane style={styles.contentContainer} className="pt-midium">
          <Pane padding={16} borderBottom="muted">
            <Heading size={600}>My Tasks</Heading>
            <Paragraph size={400} color="muted">
              Toggle radio buttons to mark tasks as completed / incompleted
            </Paragraph>
          </Pane>
          <TasksList />
        </Pane>
        <Pane style={styles.emptyLeftContainer} background={bgColor} />
      </Pane>

      <Pane>
        <TaskForm />
      </Pane>
    </div>
  );
}

export default App;
