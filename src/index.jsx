/**
 * @file Root component.
 * @author Alexey Ptitsyn <alexey.ptitsyn@gmail.com>
 * @copyright Alexey Ptitsyn <alexey.ptitsyn@gmail.com>, 2022
 */

import React from 'react';
import ReactDOM from 'react-dom';

import TasksComponent from './components/TasksComponent.jsx';

import './index.scss';

ReactDOM.render(
  <TasksComponent />,
  document.getElementById('app')
);
