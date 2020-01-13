import React, { useContext, useEffect } from "react";
import { Pane, Table } from "evergreen-ui";
import { TasksContext } from "../../contexts/TasksContext";

import Task from "./Task";
import FilterToolbar from "./FilterToolbar";

const TasksList = () => {
  const { tasks, filter, filterTasks, filteredTasks } = useContext(
    TasksContext
  );

  useEffect(() => {
    filterTasks(filter);
  }, [filter, tasks]);

  return (
    <Pane>
      <Pane display="flex" padding={8} borderBottom="muted">
        <FilterToolbar />
      </Pane>
      <Pane padding={16}>
        <Table>
          <Table.Body>
            {filteredTasks.map(task => (
              <Task key={task.id} task={task} />
            ))}
          </Table.Body>
        </Table>
      </Pane>
    </Pane>
  );
};

export default TasksList;
