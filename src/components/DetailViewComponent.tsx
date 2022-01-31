/**
 * @file Detail view component.
 * @author Alexey Ptitsyn <alexey.ptitsyn@gmail.com>
 * @copyright Alexey Ptitsyn <alexey.ptitsyn@gmail.com>, 2022
 */

import React, { useState } from 'react';
import { ITask } from '../globalTypes';

interface IDetailViewComponentProps {
  task: ITask,
  onSave: (task: ITask) => void,
  onCancel: () => void
}

/**
 * Detail view component.
 */
function DetailViewComponent(params: IDetailViewComponentProps) {
  /** @type Task */
  const [task, setTask] = useState({...params.task});

  return (
    <>
      <div>
        <textarea value={ task.text }
          onChange={(e) => {
            setTask({
              ...task,
              text: e.target.value
            });
          }}></textarea>
      </div>

      <div>
        <label>
          Completed:
          <input type="checkbox" checked={ task.completed != null }
            onChange={(e) => {
              setTask({
                ...task,
                completed: (task.completed == null ? Date.now() : null)
              })
            }} />
        </label>
      </div>

      <div>
        <label>
          Due date: { task.due }
        </label>
      </div>

      <div>
        <label>
          Task list:
          <select disabled>
            <option>(default list)</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Assignee:
          <select disabled>
            <option>(not implemented)</option>
          </select>
        </label>
      </div>

      <div>
        <a href="#" onClick={(e) => {
          e.preventDefault();
          params.onCancel();
        }}>Cancel</a>
        
        <br />
        
        <a href="#" onClick={(e) => {
          e.preventDefault();
          params.onSave(task);
        }}>Save changes</a>
      </div>
    </>
  );
}

export default DetailViewComponent;
