import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import { Pane, SelectField, TextInputField, Button } from "evergreen-ui";
import { ProjectsContext } from "../../contexts/ProjectsContext";
import { ColorsContext } from "../../contexts/ColorsContext";

const ProjectForm = ({ closePopover }) => {
  const { colors } = useContext(ColorsContext);
  const { projects, setProjects } = useContext(ProjectsContext);

  const addProject = project => {
    setProjects([...projects, project]);
  };

  const [name, setName] = useState("");
  const [colorId, setColorId] = useState(0);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isColorIdValid, setIsColorIdValid] = useState(true);

  useEffect(() => {
    console.log("use effect");
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (name === "") setIsNameValid(false);
    if (colorId === 0) setIsColorIdValid(false);

    console.log(isNameValid, isColorIdValid);

    if (isNameValid && isColorIdValid) {
      const id = new Date().getTime();
      addProject({
        id,
        name,
        colorId: parseInt(colorId),
        createdAt: moment().format("DD/MM/YYYY")
      });
      setName("");
      setColorId(0);
      closePopover();
      setIsNameValid(false);
      setIsColorIdValid(false);
    }
  };

  const handleClosePopover = e => {
    e.preventDefault();
    closePopover();
  };

  const styles = {
    Projectform: {}
  };

  return (
    <Pane style={styles.Projectform}>
      <form onSubmit={handleSubmit}>
        <TextInputField
          placeholder="Describe your project here ..."
          hint={isNameValid ? "" : "This field is required !"}
          marginBottom={10}
          value={name}
          onChange={e => setName(e.currentTarget.value)}
          className="TextInputField"
        />
        <SelectField
          marginBottom={10}
          onChange={e => setColorId(e.currentTarget.value)}
          hint={isColorIdValid ? "" : "This field is required !"}
          className="SelectField"
        >
          <option key={0} value={0} selected={colorId === 0}>
            Select a color for your project
          </option>
          {colors.map(color => (
            <option
              key={color.id}
              value={color.id}
              selected={colorId === color.id}
            >
              {color.name}
            </option>
          ))}
        </SelectField>
        <Pane
          display="flex"
          justifyContent="space-between"
          marginTop={10}
          marginBottom={10}
        >
          <Button onClick={handleClosePopover}>Close</Button>
          <Button type="submit" intent="light" appearance="primary" width="48%">
            Add project
          </Button>
        </Pane>
      </form>
    </Pane>
  );
};

export default ProjectForm;
