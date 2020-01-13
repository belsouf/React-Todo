import React from "react";
import {
  Pane,
  Tooltip,
  IconButton,
  Heading,
  SideSheet,
  Icon,
  Table,
  Badge,
  Text,
  Button,
  Position
} from "evergreen-ui";

const TaskView = ({
  task,
  isDetailsViewShown,
  setIsDetailsViewShown,
  toggleTaskStatus,
  projectColor,
  projectName,
  setIsDeleteDialogShown,
  doneIcon,
  setDoneIcon
}) => {
  const styles = {
    viewContainer: {
      width: "100%",
      minHeight: "100%",
      display: "block"
    }
  };

  return (
    <React.Fragment>
      <SideSheet
        width={450}
        isShown={isDetailsViewShown}
        onCloseComplete={() => setIsDetailsViewShown(false)}
      >
        <Pane style={styles.viewContainer} className="pt-midium">
          <Pane padding={16} borderBottom="muted">
            <Icon
              icon={doneIcon}
              size={20}
              marginRight={10}
              marginTop={3}
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
            <Heading size={600} marginLeft={28}>
              {task.name}
            </Heading>
          </Pane>
          <Pane padding={16}>
            <Table>
              <Table.Body>
                <Table.Row>
                  <Table.TextCell flex="initial">
                    <Heading size={400}>STATUS:</Heading>
                  </Table.TextCell>
                  <Table.TextCell paddingLeft={0}>
                    <Text size={400}>
                      {task.isCompleted ? "Done" : "Incomplete"}
                    </Text>
                  </Table.TextCell>
                </Table.Row>
                <Table.Row>
                  <Table.TextCell flex="initial">
                    <Heading size={400}>
                      {task.projectId === 0 ? "CATEGORY" : "PROJECT"}:
                    </Heading>
                  </Table.TextCell>
                  <Table.TextCell paddingLeft={0}>
                    <Badge color={projectColor}>{projectName}</Badge>
                  </Table.TextCell>
                </Table.Row>
                <Table.Row>
                  <Table.TextCell flex="initial">
                    <Heading size={400}>DESCRIPTION:</Heading>
                  </Table.TextCell>
                  <Table.TextCell paddingLeft={0}>
                    <Text size={400}>
                      {task.description !== "" ? task.description : "-"}
                    </Text>
                  </Table.TextCell>
                </Table.Row>
                <Table.Row>
                  <Table.TextCell flex="initial">
                    <Heading size={400}>CREATED DATE:</Heading>
                  </Table.TextCell>
                  <Table.TextCell paddingLeft={0}>
                    <Text size={400}>{task.createdAt}</Text>
                  </Table.TextCell>
                </Table.Row>
                <Table.Row>
                  <Table.TextCell flex="initial">
                    <Heading size={400}>DUE DATE:</Heading>
                  </Table.TextCell>
                  <Table.TextCell paddingLeft={0}>
                    <Text size={400}>{task.date !== "" ? task.date : "-"}</Text>
                  </Table.TextCell>
                </Table.Row>
                <Table.Row>
                  <Table.TextCell flex="initial">
                    <Heading size={400}>DUE TIME:</Heading>
                  </Table.TextCell>
                  <Table.TextCell paddingLeft={0}>
                    <Text size={400}>{task.time !== "" ? task.time : "-"}</Text>
                  </Table.TextCell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Pane>
          <Pane paddingRight={16} textAlign="right">
            <Button
              iconBefore="tick-circle"
              intent="light"
              appearance="primary"
              marginTop={16}
              marginBottom={16}
              marginLeft={8}
              onClick={() => {
                toggleTaskStatus(task.id);
              }}
            >
              {task.isCompleted ? "MARK AS INCOMPLETED" : "MARK AS DONE"}
            </Button>
            <Button
              iconBefore="trash"
              intent="danger"
              appearance="primary"
              onClick={() => {}}
              marginTop={16}
              marginBottom={16}
              marginLeft={8}
              onClick={() => setIsDeleteDialogShown(true)}
            >
              DELETE TASK
            </Button>
          </Pane>
        </Pane>
      </SideSheet>
      <Tooltip content="View details" position={Position.LEFT}>
        <IconButton
          appearance="minimal"
          intent="primary"
          height={32}
          icon="list-detail-view"
          onClick={() => setIsDetailsViewShown(true)}
        />
      </Tooltip>
    </React.Fragment>
  );
};

export default TaskView;
