/**
 * @file Task list component.
 * @author Alexey Ptitsyn <alexey.ptitsyn@gmail.com>
 * @copyright Alexey Ptitsyn <alexey.ptitsyn@gmail.com>, 2022
 */

import '../globalTypes.js';
import React, { useState } from 'react';

import TaskComponent from './TaskComponent.jsx';

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
    const index = tasks.findIndex(task => task.id == item.id);

    if(index <= 0) return;

    const newTasks = [...tasks];

    const tmp = newTasks[index];
    newTasks[index] = newTasks[index - 1];
    newTasks[index - 1] = tmp;

    setTasks(newTasks);
    setFocusIndex(index - 1);
  };

  const moveDown = (item) => {
    const index = tasks.findIndex(task => task.id == item.id);

    if(index >= tasks.length - 1) return;

    const newTasks = [...tasks];

    const tmp = newTasks[index];
    newTasks[index] = newTasks[index + 1];
    newTasks[index + 1] = tmp;

    setTasks(newTasks);
    setFocusIndex(index + 1);
  };

  const onInsert = (item) => {
    const index = tasks.findIndex(task => task.id == item.id);

    const newTask = {
      id: Date.now(),
      list: '',
      text: '',
      level: 0,
      created: Date.now(),
      modified: null,
      due: null,
      completed: null,
      owner: 'user',
      assignee: 'user'
    };

    const startOfArray = tasks.slice(0, index+1);
    const restOfArray = tasks.slice(index+1);

    const newTasks = [...startOfArray].concat([newTask]).concat(restOfArray);

    setTasks(newTasks);
    setFocusIndex(index + 1);
  };

  const items = tasks.map((item, index) => {
    return (
      <TaskComponent key={ index }
        item={ item }
        isFocused={ focusIndex == index}
        onChange={updateItem}
        onInsert={onInsert}
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
