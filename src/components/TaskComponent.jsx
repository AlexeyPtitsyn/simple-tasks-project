/**
 * @file Single task component.
 * @author Alexey Ptitsyn <alexey.ptitsyn@gmail.com>
 * @copyright Alexey Ptitsyn <alexey.ptitsyn@gmail.com>, 2022
 */
import React, { useState, useRef, useEffect } from 'react';

import './TaskComponent.scss';

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

/**
 * @typedef {Function} OnChange
 * @param {Task} item - Modified task.
 */

/**
 * @typedef {Object} TaskComponentParams
 * @property {Task} item - Task item.
 * @property {OnChange} onChange - onChage function call.
 */

/**
 * Single task component.
 * 
 * @param {TaskComponentParams} params Task component params.
 * @returns {React.Component}
 */
function TaskComponent(params) {
  const item = params.item;
  const [highlight, setHighlight] = useState(false);
  const textareaRef = useRef(null);

  // Ajust textarea height:
  if(textareaRef !== null && textareaRef.current !== null) {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }

  const changeCompleted = () => {
    if(item.completed == null) {
      params.onChange({ ...item, completed: Date.now() });
      return;
    }

    params.onChange({...item, completed: null});
  };

  const keyDown = (e) => {
    // Change item level
    if(e.key == 'Tab') {
      e.preventDefault();

      if(e.shiftKey) {
        if(item.level > 0) {
          params.onChange({...item, level: item.level - 1});
        }
        return;
      }

      params.onChange({...item, level: item.level + 1 });
      return;
    }

    // Create new record
    if(e.key == 'Enter' && !e.shiftKey) {
      e.preventDefault();
    }
  };

  return (
    <div className={"task-component" + (highlight ? ' task_component_highlight' : '')}>
      <div className="task-component__space-area"
        style={{ width: (16*item.level) + 'px'}}></div>
      <div className="task-component__checkbox-area">
        <input type="checkbox"
          checked={item.completed != null}
          onChange={changeCompleted} />
      </div>
      <div className="task-component__text-area">
        <textarea className="task-component__text-field"
          ref={textareaRef}
          value={item.text}
          onChange={(e) => {
            params.onChange({ ...item, text: e.target.value });
          }}
          onKeyDown={keyDown}
          onFocus={() => {setHighlight(true)}}
          onBlur={() => {setHighlight(false)}}></textarea>
      </div>
      <div className="task-component__details-area">
        Details &gt;
      </div>
    </div>
  );
}

export default TaskComponent;
