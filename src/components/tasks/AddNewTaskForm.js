import React, { useState } from "react";
import ApiManager from "../../modules/ApiManager";
import "./TaskForm.css";

const activeUser = JSON.parse(sessionStorage.getItem('credentials'));

const AddNewTaskForm = props => {
  const [task, setTask] = useState({
    name: "",
    expectedCompletion: "",
    userId: "",
    isComplete: false,

  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...task };
    stateToChange[evt.target.id] = evt.target.value;
    setTask(stateToChange);
  };

  const constructNewTask = evt => {
    evt.preventDefault();
    const newTask = {
      name: task.name,
      expectedCompletion: task.expectedCompletion,
      userId: activeUser.id,
      isComplete: task.isComplete
    };

    if (task.name === "" || task.expectedCompletion === "") {
      window.alert("Please fill out all fields");
    } else {
      setIsLoading(true);
      ApiManager.post("tasks", newTask).then(() => props.history.push("/tasks"));
    }
  };

  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="name"
              placeholder="What do you need to do?"
            />
            <label htmlFor="phoneNumber">Task Name</label>
            <input
              type="date"
              required
              onChange={handleFieldChange}
              id="expectedCompletion"
              placeholder="Enter your date to complete by"
            />
            <label htmlFor="name">Expected Completion</label>
          </div>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={constructNewTask}
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default AddNewTaskForm;
