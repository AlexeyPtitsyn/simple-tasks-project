/**
 * @file Root component.
 * @author Alexey Ptitsyn <alexey.ptitsyn@gmail.com>
 * @copyright Alexey Ptitsyn <alexey.ptitsyn@gmail.com>, 2022
 */

import React from 'react';
import ReactDOM from 'react-dom';

import MainComponent from './components/MainComponent.jsx';

import './index.scss';

ReactDOM.render(
  <MainComponent />,
  document.getElementById('app')
);
