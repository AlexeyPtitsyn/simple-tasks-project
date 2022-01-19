/**
 * @file Global types that can be used in multiple components.
 * @author Alexey Ptitsyn <alexey.ptitsyn@gmail.com>
 * @copyright Alexey Ptitsyn <alexey.ptitsyn@gmail.com>, 2022
 */

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
