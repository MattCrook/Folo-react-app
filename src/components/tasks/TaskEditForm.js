import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import "./TaskForm.css";

const TaskEditForm = props => {
  const [task, setTask] = useState({
    name: "",
    expectedCompletion: "",
    isComplete: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = event => {
    const stateToChange = { ...task };
    stateToChange[event.target.id] = event.target.value;
    setTask(stateToChange);
  };

  const updateExistingTask = event => {
    event.preventDefault();
    setIsLoading(true);

    const editedTask = {
      id: props.match.params.taskId,
      name: task.name,
      expectedCompletion: task.expectedCompletion,
      isComplete: task.isComplete
    };
    ApiManager.update("tasks", editedTask).then(() =>
      props.history.push("/tasks")
    );
  };

  useEffect(() => {
    ApiManager.get("tasks", props.match.params.taskId).then(task => {
      setTask(task);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <form>
        <fieldset className="task-form-fieldset">
          <div className="formgrid">
            <input
              type="text"
              required
              className="form-control"
              onChange={handleInputChange}
              id="name"
              value={task.name}
            />
            <label htmlFor="task-name">Task</label>

            <input
              type="date"
              required
              className="form-control"
              onChange={handleInputChange}
              id="expectedCompletion"
              value={task.expectedCompletion}
            />
            <label htmlFor="expectedCompletion">Expected Completion Date</label>
            <input
              type="checkbox"
              className="is-checked-edit-form"
              onChange={handleInputChange}
              id="is-complete-box"
              value={task.isComplete}
            />
            <label>Is Complete</label>
          </div>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={updateExistingTask}
              className="submit-edit-button"
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default TaskEditForm;
