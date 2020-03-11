import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import TaskCard from "./TaskCard";
const TaskList = props => {
  const [tasks, setTasks] = useState([]);
  const getUncompleted = async () => {
    try {
      const tasksFromAPI = await ApiManager.getUncompleted("tasks");
      setTasks(tasksFromAPI);
    } catch (error) {
      console.log(error);
    }
  };
  const updateTask = async task => {
    console.log("updateTask: ", task);
    try {
      await ApiManager.patch("tasks", task, { isComplete: true });
      const tasksFromAPI = await ApiManager.getUncompleted("tasks");
      setTasks(tasksFromAPI);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTask = async id => {
    try {
      await ApiManager.delete("tasks", id);
      const tasksFromAPI = await ApiManager.getUncompleted("tasks");
      setTasks(tasksFromAPI);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUncompleted();
  }, []);
  return (
    <>
      <div className="icon-container">
        <span data-tooltip="BACK">
          <i
            className="big arrow circle left icon"
            id="back-arrow-detail"
            onClick={() => props.history.push("/")}
          ></i>
        </span>
        <span data-tooltip="COMPLETED">
          <i
            className="big clipboard check icon"
            onClick={() => props.history.push("/tasks/completed")}
          ></i>
        </span>
        <span data-tooltip="ADD">
          <i
            className="big plus square outline icon"
            id="plusIcon"
            onClick={() => props.history.push("/tasks/new")}
          ></i>
        </span>
      </div>

      <div className="task-container-cards">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
            {...props}
          />
        ))}
      </div>
    </>
  );
};
export default TaskList;
