import React, { useState, useContext } from "react";
import moment from "moment";
import { Pane, Button, Menu } from "evergreen-ui";
import { TasksContext } from "../../contexts/TasksContext";

import ProjectsList from "../SideBar/ProjectsList";

const Sidebar = () => {
  const bgColor = "blueTint";
  const [activeMenu, setActiveMenu] = useState("all");
  const { tasks, setFilter, setIsTaskFormShown } = useContext(TasksContext);
  const nbInboxTasks = [...tasks].filter(task => task.projectId === 0).length;
  const todayTasks = [...tasks].filter(
    task => task.date === moment().format("DD/MM/YYYY")
  ).length;

  const styles = {
    sideBarContainer: {
      display: "flex",
      flexDirection: "column",
      width: "30%",
      height: "100%",
      borderRight: "1px solid #E4E7EB"
    }
  };

  return (
    <Pane
      style={styles.sideBarContainer}
      className="sideBarContainer pt-midium"
      background={bgColor}
    >
      <Button
        iconBefore="add"
        intent="light"
        appearance="primary"
        onClick={() => setIsTaskFormShown(true)}
        marginTop={16}
        marginBottom={16}
        marginLeft={16}
      >
        ADD NEW TASK
      </Button>
      <Pane>
        <Menu>
          <Menu.Group title="Actions" display="flex">
            <Menu.Item
              icon="th-list"
              secondaryText={tasks.length !== 0 ? tasks.length : "0"}
              onSelect={() => {
                setActiveMenu("all");
                setFilter({ type: "all" });
              }}
              className={activeMenu === "all" ? "activeMenu" : ""}
            >
              ALL TASKS
            </Menu.Item>
            <Menu.Item
              icon="inbox"
              secondaryText={nbInboxTasks !== 0 ? nbInboxTasks : "0"}
              onSelect={() => {
                setActiveMenu("inbox");
                setFilter({ type: "inbox" });
              }}
              className={activeMenu === "inbox" ? "activeMenu" : ""}
            >
              INBOX
            </Menu.Item>
            <Menu.Item
              icon="calendar"
              secondaryText={todayTasks !== 0 ? todayTasks : "0"}
              onSelect={() => {
                setActiveMenu("today");
                setFilter({ type: "today" });
              }}
              className={activeMenu === "today" ? "activeMenu" : ""}
            >
              TODAY
            </Menu.Item>
          </Menu.Group>
          <ProjectsList activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        </Menu>
      </Pane>
    </Pane>
  );
};

export default Sidebar;
