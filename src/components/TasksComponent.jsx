/**
 * @file Task list component.
 * @author Alexey Ptitsyn <alexey.ptitsyn@gmail.com>
 * @copyright Alexey Ptitsyn <alexey.ptitsyn@gmail.com>, 2022
 */

import '../globalTypes.js';
import React, { useState, useEffect } from 'react';

import TaskComponent from './TaskComponent.jsx';

/** @type Task */
const NEW_TASK_TEMPLATE = {
  id: null,
  list: '',
  text: '',
  level: 0,
  created: null,
  modified: null,
  due: null,
  completed: null,
  owner: 'user',
  assignee: 'user'
};

/**
 * @typedef {Function} TasksComponentChangeCallback
 * @param {Task[]} tasks - New Tasks list.
 */

/**
 * @typedef {Function} DetailsClickCallback
 * @param {Task} task - Task.
 */

/**
 * @typedef {Object} TasksComponentParams
 * @property {Task[]} tasks - Tasks.
 * @property {nuber} focus - Focus index.
 * @property {TasksComponentChangeCallback} onChange - onChange callback.
 * @property {TasksComponentChangeFocusCallback} onChangeFocus - on Change focus index.
 * @property {DetailsClickCallback} onDetailsClick - on details click callback.
 */

/**
 * Task list component.
 * @param {TasksComponentParams} params - Task component parameters.
 * @returns {React.Component}
 */
function TasksComponent(params) {
  const tasks = params.tasks;
  const focusIndex = params.focus;

  const updateItem = (newItem) => {
    let newTasks = [];

    tasks.forEach((task) => {
      if(task.id == newItem.id) {
        newTasks.push(newItem);
        return;
      }

      newTasks.push(task);
    });

    params.onChange(newTasks);
  };

  const goUp = (item) => {
    let index = tasks.findIndex(task => task.id == item.id);

    if(index <= 0) return;

    index--;
    params.onChangeFocus(index);
  };

  const goDown = (item) => {
    let index = tasks.findIndex(task => task.id == item.id);

    if(index >= tasks.length - 1) return;

    index++;
    params.onChangeFocus(index);
  };

  const moveUp = (item) => {
    const index = tasks.findIndex(task => task.id == item.id);

    if(index <= 0) return;

    const newTasks = [...tasks];

    const tmp = newTasks[index];
    newTasks[index] = newTasks[index - 1];
    newTasks[index - 1] = tmp;

    params.onChange(newTasks);
    params.onChangeFocus(index - 1);
  };

  const moveDown = (item) => {
    const index = tasks.findIndex(task => task.id == item.id);

    if(index >= tasks.length - 1) return;

    const newTasks = [...tasks];

    const tmp = newTasks[index];
    newTasks[index] = newTasks[index + 1];
    newTasks[index + 1] = tmp;

    params.onChange(newTasks);
    params.onChangeFocus(index + 1);
  };

  const onInsert = (item) => {
    const index = tasks.findIndex(task => task.id == item.id);

    const startOfArray = tasks.slice(0, index+1);
    const restOfArray = tasks.slice(index+1);

    const newTasks = [...startOfArray].concat([{...NEW_TASK_TEMPLATE}]).concat(restOfArray);

    params.onChange(newTasks);
    params.onChangeFocus(index + 1);
  };

  const items = tasks.map((item, index) => {
    return (
      <TaskComponent key={ item.id }
        item={ item }
        isFocused={ focusIndex == index}
        onChange={updateItem}
        onInsert={onInsert}
        onGoUp={goUp}
        onGoDown={goDown}
        onMoveUp={moveUp}
        onMoveDown={moveDown}
        onDetailsClick={ params.onDetailsClick } />
    );
  });

  return (
    <>
      { items }
    </>
  );
};

export default TasksComponent;
