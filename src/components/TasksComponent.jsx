/**
 * @file Task list component.
 * @author Alexey Ptitsyn <alexey.ptitsyn@gmail.com>
 * @copyright Alexey Ptitsyn <alexey.ptitsyn@gmail.com>, 2022
 */

import React, { useState } from 'react';

import TaskComponent from './TaskComponent.jsx';

/**
 * @typedef {Object} Task
 * @property {number} id - Task ID.
 * @property {string} list - Task list name.
 * @property {string} text - Task text.
 * @property {number} level - Task level.
 * @property {number} created - Task creation date. As UNIX time in ms.
 * @property {?number} modified - Task modification date. As UNIX time in ms.
 * @property {?number} due - Task due date. As UNIX time in ms.
 * @property {?number} completed - Task completed date. As UNIX-time in ms.
 * @property {string} owner - Owner username.
 * @property {string} assignee - Whom task is assigned to.
 */

/** @type {Task[]} */
const tasksSource = [
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

function TasksComponent() {
  const [tasks, setTasks] = useState(tasksSource);
  const [focusIndex, setFocusIndex] = useState(0);

  const updateItem = (newItem) => {
    let newTasks = [];

    tasks.forEach((task) => {
      if(task.id == newItem.id) {
        newTasks.push(newItem);
        return;
      }

      newTasks.push(task);
    });

    setTasks(newTasks);
  };

  const goUp = (item) => {
    let index = tasks.findIndex(task => task.id == item.id);

    if(index <= 0) return;

    index--;
    setFocusIndex(index);
  };

  const goDown = (item) => {
    let index = tasks.findIndex(task => task.id == item.id);

    if(index >= tasks.length - 1) return;

    index++;
    setFocusIndex(index);
  };

  const moveUp = (item) => {
    // TODO
  };

  const moveDown = (item) => {
    // TODO
  };

  const items = tasks.map((item, index) => {
    return (
      <TaskComponent key={ item.id }
        item={ item }
        isFocused={ focusIndex == index}
        onChange={updateItem}
        onGoUp={goUp}
        onGoDown={goDown}
        onMoveUp={moveUp}
        onMoveDown={moveDown} />
    );
  });

  return (
    <>
      { items }
    </>
  );
};

export default TasksComponent;
