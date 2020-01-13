import React, { useState, useContext, useEffect } from "react";
import {
  Table,
  Icon,
  Text,
  Tooltip,
  IconButton,
  Badge,
  Heading,
  Dialog,
  Pane,
  Position
} from "evergreen-ui";
import { TasksContext } from "../../contexts/TasksContext";
import { ProjectsContext } from "../../contexts/ProjectsContext";
import { ColorsContext } from "../../contexts/ColorsContext";

import TaskView from "./TaskView";

const Task = ({ task }) => {
  const { tasks, setTasks } = useContext(TasksContext);
  const { projects } = useContext(ProjectsContext);
  const { colors } = useContext(ColorsContext);

  const [isDetailsViewShown, setIsDetailsViewShown] = useState(false);
  const [isDeleteDialogShown, setIsDeleteDialogShown] = useState(false);

  const [doneIcon, setDoneIcon] = useState(
    task.isCompleted ? "tick-circle" : "circle"
  );

  useEffect(() => {
    setDoneIcon(task.isCompleted ? "tick-circle" : "circle");
  }, [tasks]);

  const deleteTask = id => {
    const allTasks = [...tasks];
    const taskToDeleteIndex = allTasks.findIndex(task => task.id === id);
    allTasks.splice(taskToDeleteIndex, 1);
    setTasks(allTasks);
    setIsDeleteDialogShown(false);
  };

  const toggleTaskStatus = id => {
    const allTasks = [...tasks];
    const taskToEdit = allTasks.find(task => task.id === id);
    taskToEdit.isCompleted = !taskToEdit.isCompleted;
    setTasks(allTasks);
    setDoneIcon(taskToEdit.isCompleted ? "tick-circle" : "circle");
  };

  const getProjectName = projectId => {
    const allProjects = [...projects];
    return allProjects.find(project => project.id === projectId).name;
  };

  const getProjectColor = projectId => {
    const colorId = projects.find(project => project.id === projectId).colorId;
    return colors.find(color => color.id === colorId).name;
  };

  const projectName =
    task.projectId !== 0 ? getProjectName(task.projectId) : "inbox";
  const projectColor =
    task.projectId !== 0 ? getProjectColor(task.projectId) : "neutral";
  const strikethrough = task.isCompleted ? "line-through" : "";

  return (
    <Table.Row key={task.id}>
      <Table.TextCell>
        <Icon
          icon={doneIcon}
          size={17}
          marginRight={10}
          marginTop={2}
          position="absolute"
          cursor="pointer"
          onMouseEnter={() => {
            if (!task.isCompleted) setDoneIcon("tick-circle");
          }}
          onMouseLeave={() => {
            if (!task.isCompleted) setDoneIcon("circle");
          }}
          onClick={() => toggleTaskStatus(task.id)}
        />
        <Heading size={400} marginLeft={25} className={strikethrough}>
          {task.name}
          <Badge color={projectColor} marginLeft={10}>
            {projectName}
          </Badge>
          <Text size={300} marginLeft={10} color="muted">
            {task.date} {task.time}
          </Text>
        </Heading>
      </Table.TextCell>
      <Table.TextCell flexShrink={0} flexGrow={0} flex="auto" padding={0}>
        <TaskView
          task={task}
          isDetailsViewShown={isDetailsViewShown}
          setIsDetailsViewShown={setIsDetailsViewShown}
          toggleTaskStatus={toggleTaskStatus}
          projectColor={projectColor}
          projectName={projectName}
          setIsDeleteDialogShown={setIsDeleteDialogShown}
          doneIcon={doneIcon}
          setDoneIcon={setDoneIcon}
        />
      </Table.TextCell>
      <Table.TextCell flexShrink={0} flexGrow={0} flex="auto" padding={0}>
        <Pane>
          <Dialog
            isShown={isDeleteDialogShown}
            title="DELETE TASK"
            intent="danger"
            onCloseComplete={() => setIsDeleteDialogShown(false)}
            onConfirm={() => deleteTask(task.id)}
            confirmLabel="Delete"
          >
            <Text size={500}>Are you sure you want to delete this task ?</Text>
          </Dialog>

          <Tooltip content="Delete task" position={Position.RIGHT}>
            <IconButton
              appearance="minimal"
              intent="danger"
              height={32}
              icon="remove"
              onClick={() => setIsDeleteDialogShown(true)}
            />
          </Tooltip>
        </Pane>
      </Table.TextCell>
    </Table.Row>
  );
};

export default Task;
