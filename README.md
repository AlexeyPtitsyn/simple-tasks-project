# Simple tasks project

This project will be written here bit-by-bit.

## Concept

This is the React application that allows user to make task lists like good-old
google tasks.

## Task object structure

- `id` - Task global ID.
- `list` - Task list name.
- `text` - Task text.
- `level` - Task lever (number of spaces before task).
- `created` - Task creation date. Number.
- `modified` - Task modification date. Number.
- `due` - Task due date. Number.
- `owner` - Task owner login.
- `assignee` - Whom assigned to login.

## Task list object structure

- `id` - Task list ID.
- `name` - Task list name.
- `owner` - Task list owner.
- `assignee` - Whom this task list is assigned to.

## Hotkeys

- `Enter` - Create task under current.
- `Tab` - Make task level higher.
- `Shift-Tab` - Make task level lower.
- `Shift-Enter` - Add new line at the current task under cursor position.
- `Up` - Go to previous task.
- `Down` - Go to next task.
- `Alt-Up` - Move task upper.
- `Alt-Down` - Move task lower.
