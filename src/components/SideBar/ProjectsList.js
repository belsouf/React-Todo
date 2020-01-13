import React, { useContext, useState } from "react";
import { Menu, Popover, Pane, Heading, Position, Icon } from "evergreen-ui";
import { TasksContext } from "../../contexts/TasksContext";
import { ProjectsContext } from "../../contexts/ProjectsContext";
import { ColorsContext } from "../../contexts/ColorsContext";

import ProjectForm from "../Projects/ProjectForm";

const ProjectsList = ({ activeMenu, setActiveMenu }) => {
  const bgColor = "blueTint";

  const { setFilter } = useContext(TasksContext);
  const { colors } = useContext(ColorsContext);
  const { projects } = useContext(ProjectsContext);

  const getProjectColorCode = projectId => {
    const colorId = projects.find(project => project.id === projectId).colorId;
    return colors.find(color => color.id === colorId).code;
  };

  const styles = {
    projectFormPopover: {
      border: "1px solid #E4E7EB",
      width: 240,
      display: "flex",
      flexDirection: "column"
    }
  };

  return (
    <Menu.Group title="projects">
      {projects.map(project => (
        <Menu.Item
          paddingLeft={28}
          onSelect={() => {
            setActiveMenu(project.id);
            setFilter({ type: "project", value: project.id });
          }}
          className={activeMenu === project.id ? "activeMenu" : ""}
        >
          <Icon
            icon="full-circle"
            color={getProjectColorCode(project.id)}
            position="absolute"
            marginTop={2}
            marginLeft={-28}
            size={17}
          />
          {project.name}
        </Menu.Item>
      ))}
      <Popover
        content={({ close }) => (
          <Pane style={styles.projectFormPopover}>
            <Pane padding={16} borderBottom="muted">
              <Heading size={600}>Create new project</Heading>
            </Pane>
            <Pane padding={16} borderBottom="muted">
              <ProjectForm closePopover={close} />
            </Pane>
          </Pane>
        )}
        position={Position.RIGHT}
      >
        <Menu.Item icon="plus" intent="success">
          Add new project
        </Menu.Item>
      </Popover>
    </Menu.Group>
  );
};

export default ProjectsList;
