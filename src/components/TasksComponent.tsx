/**
 * @file Task list component.
 * @author Alexey Ptitsyn <alexey.ptitsyn@gmail.com>
 * @copyright Alexey Ptitsyn <alexey.ptitsyn@gmail.com>, 2022
 */

import React from 'react';
import TaskComponent from './TaskComponent';
import { ITask } from '../globalTypes';

const NEW_TASK_TEMPLATE: ITask = {
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

interface ITasksComponentProps {
  tasks: ITask[],
  focus: number,
  onChange: (tasks: ITask[]) => void,
  onChangeFocus: (index: number) => void,
  onDetailsClick: (task: ITask) => void
}

/**
 * Task list component.
 */
function TasksComponent(params: ITasksComponentProps) {
  const tasks = params.tasks;
  const focusIndex = params.focus;

  const updateItem = (newItem: ITask) => {
    let newTasks: ITask[] = [];

    tasks.forEach((task) => {
      if(task.id == newItem.id) {
        newTasks.push(newItem);
        return;
      }

      newTasks.push(task);
    });

    params.onChange(newTasks);
  };

  const goUp = (item: ITask) => {
    let index = tasks.findIndex(task => task.id == item.id);

    if(index <= 0) return;

    index--;
    params.onChangeFocus(index);
  };

  const goDown = (item: ITask) => {
    let index = tasks.findIndex(task => task.id == item.id);

    if(index >= tasks.length - 1) return;

    index++;
    params.onChangeFocus(index);
  };

  const moveUp = (item: ITask) => {
    const index = tasks.findIndex(task => task.id == item.id);

    if(index <= 0) return;

    const newTasks = [...tasks];

    const tmp = newTasks[index];
    newTasks[index] = newTasks[index - 1];
    newTasks[index - 1] = tmp;

    params.onChange(newTasks);
    params.onChangeFocus(index - 1);
  };

  const moveDown = (item: ITask) => {
    const index = tasks.findIndex(task => task.id == item.id);

    if(index >= tasks.length - 1) return;

    const newTasks = [...tasks];

    const tmp = newTasks[index];
    newTasks[index] = newTasks[index + 1];
    newTasks[index + 1] = tmp;

    params.onChange(newTasks);
    params.onChangeFocus(index + 1);
  };

  const onInsert = (item: ITask) => {
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
