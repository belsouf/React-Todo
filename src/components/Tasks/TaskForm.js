import React, { useState, useRef, useContext } from "react";
import moment from "moment";
import {
  Pane,
  SelectField,
  TextInputField,
  Dialog,
  Label,
  Textarea
} from "evergreen-ui";
import { TasksContext } from "../../contexts/TasksContext";
import { ProjectsContext } from "../../contexts/ProjectsContext";

const TaskForm = () => {
  const { projects } = useContext(ProjectsContext);
  const { tasks, setTasks, isTaskFormShown, setIsTaskFormShown } = useContext(
    TasksContext
  );

  const [name, setName] = useState("");
  const [projectId, setProjetId] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [dateInputType, setDateInputType] = useState("text");
  const [timeInputType, setTimeInputType] = useState("text");

  const [isLoading, setIsLoading] = useState(false);

  const form = useRef();

  const addTask = task => {
    setTasks([...tasks, task]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    const id = new Date().getTime();
    addTask({
      id,
      name,
      projectId: parseInt(projectId),
      description,
      isCompleted: false,
      date: date !== "" ? moment(date).format("DD/MM/YYYY") : "",
      time,
      createdAt: moment().format("DD/MM/YYYY")
    });
    setName("");
    setProjetId(0);
    setDate(moment().format("YYYY-MM-DD"));
    setTime(moment().format("HH:mm"));
    setIsLoading(false);
    setIsTaskFormShown(false);
  };

  const styles = {
    Taskform: {}
  };
  return (
    <Dialog
      width={400}
      isShown={isTaskFormShown}
      title="Create new task"
      onCloseComplete={() => {
        setIsTaskFormShown(false);
        setIsLoading(false);
      }}
      isConfirmLoading={isLoading}
      onConfirm={() => {
        form.current.dispatchEvent(new Event("submit"));
      }}
      confirmLabel={isLoading ? "Loading..." : "Add Task"}
    >
      <Pane style={styles.Taskform}>
        <form ref={form} onSubmit={handleSubmit}>
          <TextInputField
            label="Task Name *"
            placeholder="Describe your task here ..."
            value={name}
            onChange={e => setName(e.currentTarget.value)}
            marginBottom={10}
          />
          <SelectField
            label="Project"
            onChange={e => setProjetId(e.currentTarget.value)}
            marginBottom={10}
          >
            <option key="0" value="" selected={projectId === 0}>
              Select a project ...
            </option>
            {projects.map(project => (
              <option
                key={project.id}
                value={project.id}
                selected={projectId === project.id}
              >
                {project.name}
              </option>
            ))}
          </SelectField>
          <Pane marginBottom={8}>
            <Label htmlFor="description" marginBottom={4} display="block">
              Description
            </Label>
            <Textarea
              value={description}
              onChange={e => setDescription(e.currentTarget.value)}
              id="description"
              placeholder="Describe task here..."
            />
          </Pane>
          <Pane display="flex" justifyContent="space-between">
            <TextInputField
              label="Due Date"
              placeholder="Task date ..."
              width="48%"
              value={dateInputType === "date" ? date : ""}
              onChange={e => setDate(e.currentTarget.value)}
              onFocus={() => setDateInputType("date")}
              onBlur={e => {
                if (e.currentTarget.value === "") setDateInputType("text");
              }}
              type={dateInputType}
              marginBottom={10}
            />
            <TextInputField
              label="Due Time"
              placeholder="Task time ..."
              width="48%"
              value={timeInputType === "time" ? time : ""}
              onChange={e => setTime(e.currentTarget.value)}
              onFocus={() => setTimeInputType("time")}
              onBlur={e => {
                if (e.currentTarget.value === "") setTimeInputType("text");
              }}
              type={timeInputType}
              marginBottom={10}
            />
          </Pane>
        </form>
      </Pane>
    </Dialog>
  );
};

export default TaskForm;
