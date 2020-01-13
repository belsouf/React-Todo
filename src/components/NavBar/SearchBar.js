import React, { useState, useContext, useEffect } from "react";
import { Pane, SearchInput, Table } from "evergreen-ui";
import { TasksContext } from "../../contexts/TasksContext";
import Task from "../Tasks/Task";

const SearchBar = () => {
  const inputThemeClass = "darkBgInput";

  const { tasks } = useContext(TasksContext);
  const [searchValue, setSearchValue] = useState("Search ...");
  const [matches, setMatches] = useState([...tasks]);
  const [isSearchResultShown, setIsSearchResultShown] = useState(false);

  useEffect(() => {
    searchTask(searchValue);
  }, [tasks]);

  const searchTask = value => {
    if (value === "" || value === "Search ...") {
      setIsSearchResultShown(false);
      setMatches([]);
    } else {
      let data = [...tasks].filter(task => {
        if (task.name.includes(value)) return task;
      });
      setMatches(data);
      data.length !== 0
        ? setIsSearchResultShown(true)
        : setIsSearchResultShown(false);
    }
  };

  const styles = {
    searchBarContainer: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      width: "55%",
      height: "100%"
    },
    searchResultContainer: {
      paddingRight: "10px",
      paddingLeft: "10px"
    },
    searchResult: {
      background: "white",
      border: "3px solid #314769",
      borderRadius: "0 0 10px 10px",
      marginTop: "10px",
      width: "100%",
      boxShadow: "1px 20px 20px #0000001a",
      zIndex: 1,
      padding: "13px",
      display: isSearchResultShown ? "block" : "none"
    }
  };
  return (
    <Pane style={styles.searchBarContainer}>
      <SearchInput
        width="100%"
        id="ids-are-optional"
        placeholder="Search ..."
        marginBottom={0}
        marginTop={14}
        className={inputThemeClass}
        value={searchValue}
        onChange={e => {
          setSearchValue(e.currentTarget.value);
          searchTask(e.currentTarget.value);
        }}
        onFocus={() => {
          if (searchValue === "Search ...") setSearchValue("");
        }}
        onBlur={() => {
          if (searchValue === "") setSearchValue("Search ...");
        }}
      />
      <Pane style={styles.searchResult} className="searchResult">
        <Table>
          {matches.map(task => (
            <Task key={task.id} task={task} />
          ))}
        </Table>
      </Pane>
    </Pane>
  );
};

export default SearchBar;
