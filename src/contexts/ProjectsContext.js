import React, { useState, createContext } from "react";
import data from "../data";

export const ProjectsContext = createContext({
  projects: {},
  setProjects: () => {}
});

const ProjectsContextProvider = props => {
  const [projects, setProjects] = useState(data.projects);
  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {props.children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContextProvider;
