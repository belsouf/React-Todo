import React, { useState, useContext, useEffect } from "react";
import { Tablist, Tab, Text } from "evergreen-ui";
import { TasksContext } from "../../contexts/TasksContext";

const FilterToolbar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { setFilter, filterType } = useContext(TasksContext);

  const changeFilter = index => {
    if (index === 0) setFilter({ type: "isCompleted", value: null });
    if (index === 1) setFilter({ type: "isCompleted", value: true });
    if (index === 2) setFilter({ type: "isCompleted", value: false });
    setSelectedIndex(index);
  };
  useEffect(() => {
    changeFilter(0);
  }, [filterType]);

  return (
    <Tablist>
      {["All", "Completed Tasks", "Incompleted Tasks"].map((tab, index) => (
        <Tab
          key={tab}
          isSelected={selectedIndex === index}
          onSelect={() => changeFilter(index)}
        >
          <Text size={400}>{tab}</Text>
        </Tab>
      ))}
    </Tablist>
  );
};

export default FilterToolbar;
