/**
 * @file Main component.
 * @author Alexey Ptitsyn <alexey.ptitsyn@gmail.com>
 * @copyright Alexey Ptitsyn <alexey.ptitsyn@gmail.com>, 2022
 */

import React, { useState } from 'react';
import TasksComponent from "./TasksComponent";
import DetailViewComponent from './DetailViewComponent';

import { ITask } from '../globalTypes';

const tasksSource: ITask[] = [
  {
    id: 0,
    list: '',
    text: 'Task 1',
    level: 0,
    created: 1642418969879,
    modified: null,
    due: null,
    completed: null,
    owner: 'user',
    assignee: 'user'
  },
  {
    id: 1,
    list: '',
    text: 'Task 2 completed\nNew line',
    level: 0,
    created: 1642418969879,
    modified: 1642418969879,
    due: null,
    completed: 1642418969879,
    owner: 'user',
    assignee: 'user'
  },
  {
    id: 2,
    list: '',
    text: 'Task 3',
    level: 1,
    created: 1642418969879,
    modified: null,
    due: null,
    completed: null,
    owner: 'user',
    assignee: 'user'
  }
];

function MainComponent() {
  const [tasks, setTasks] = useState(tasksSource);
  const [tasksFocusIndex, setTasksFocusIndex] = useState(0);
  const [detailView, setDetailView] = useState(null);

  /**
   * On task changed.
   */
  function onChangeTasks(newTasks: ITask[]) {
    const addTasks = [...newTasks];

    addTasks.forEach((task) => {
      if(task.id == null) {
        task.id = Date.now();
        task.created = Date.now();
      }
    });

    setTasks(addTasks);
  }

  /**
   * Change tasks focus index.
   */
  function onChangeFocus(index: number) {
    setTasksFocusIndex(index);
  }

  /**
   * If details button is clicked.
   */
  function onDetailsClick(task: ITask) {
    setDetailView(task);
  }

  return (
    <>
      {detailView == null &&
        <TasksComponent tasks={tasks}
          onChange={onChangeTasks}
          focus={tasksFocusIndex}
          onChangeFocus={onChangeFocus}
          onDetailsClick={onDetailsClick} />
      }

      {detailView != null &&
        <DetailViewComponent task={detailView}
          onCancel={() => {
            setDetailView(null);
          }}
          onSave={(newTask: ITask) => {
            console.warn('Save task is not implemented yet.');
          }}/>
      }
    </>
  );
}

export default MainComponent;
