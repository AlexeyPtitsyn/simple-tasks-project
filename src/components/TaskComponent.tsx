/**
 * @file Single task component.
 * @author Alexey Ptitsyn <alexey.ptitsyn@gmail.com>
 * @copyright Alexey Ptitsyn <alexey.ptitsyn@gmail.com>, 2022
 */

import React, { useState, useRef, useEffect } from 'react';
import './TaskComponent.scss';
import { ITask } from '../globalTypes';

interface ITaskComponentProps {
  item: ITask,
  isFocused: boolean,
  onChange: (item: ITask) => void,
  onInsert: (item: ITask) => void,
  onGoUp: (item: ITask) => void,
  onGoDown: (item: ITask) => void,
  onMoveUp: (item: ITask) => void,
  onMoveDown: (item: ITask) => void,
  onDetailsClick: (task: ITask) => void
}

/**
 * Single task component.
 */
function TaskComponent(params: ITaskComponentProps) {
  const item = params.item;
  const [highlight, setHighlight] = useState(false);
  const textareaRef = useRef(null);

  // Adjust textarea height:
  useEffect(() => {
    if(textareaRef !== null && textareaRef.current !== null) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [item]);

  // Adjust focus
  useEffect(() => {
    if(params.isFocused) {
      textareaRef.current.focus();
    }
  }, [params.isFocused]);

  const changeCompleted = () => {
    if(item.completed == null) {
      params.onChange({ ...item, completed: Date.now() });
      return;
    }

    params.onChange({...item, completed: null});
  };

  const keyDown = (e: React.KeyboardEvent) => {
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
      params.onInsert(item);
      return;
    }

    if(e.key == "ArrowUp") {
      if(e.altKey) {
        e.preventDefault();
        params.onMoveUp(item);
        return;
      }
      
      if((e.target as HTMLTextAreaElement).selectionStart == 0) {
        params.onGoUp(item);
        return;
      }
    }

    if(e.key == "ArrowDown") {
      if(e.altKey) {
        e.preventDefault();
        params.onMoveDown(item);
        return;
      }

      if((e.target as HTMLTextAreaElement).selectionStart == (e.target as HTMLTextAreaElement).value.length) {
        params.onGoDown(item);
        return;
      }
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
          ref={ textareaRef }
          value={ item.text }
          autoFocus={ params.isFocused }
          onChange={(e) => {
            params.onChange({ ...item, text: e.target.value });
          }}
          onKeyDown={keyDown}
          onFocus={() => {setHighlight(true)}}
          onBlur={() => {setHighlight(false)}}></textarea>
      </div>
      <div className="task-component__details-area" onClick={() => {
        params.onDetailsClick(item);
      }}>
        Details &gt;
      </div>
    </div>
  );
}

export default TaskComponent;
