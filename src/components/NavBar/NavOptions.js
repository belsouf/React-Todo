import React, { useContext } from "react";
import { Pane, Tooltip, IconButton, Avatar } from "evergreen-ui";
import { TasksContext } from "../../contexts/TasksContext";

const NavOptions = () => {
  const { setIsTaskFormShown } = useContext(TasksContext);

  const styles = {
    optionsContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      width: "30%",
      height: "100%"
    }
  };
  return (
    <Pane style={styles.optionsContainer} className="ph-16 p-right">
      <Tooltip content="Add new task">
        <IconButton
          appearance="minimal"
          height={45}
          className="darkBgTypo"
          icon="add"
          onClick={() => setIsTaskFormShown(true)}
        />
      </Tooltip>
      <Tooltip content="Settings">
        <IconButton
          appearance="minimal"
          height={45}
          className="darkBgTypo"
          icon="cog"
          marginLeft={8}
        />
      </Tooltip>
      <Tooltip content="My account">
        <Avatar isSolid name="Soufyane Belfkier" size={36} marginLeft={30} />
      </Tooltip>
    </Pane>
  );
};

export default NavOptions;
