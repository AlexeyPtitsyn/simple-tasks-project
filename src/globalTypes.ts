/**
 * @file Global types that can be used in multiple components.
 * @author Alexey Ptitsyn <alexey.ptitsyn@gmail.com>
 * @copyright Alexey Ptitsyn <alexey.ptitsyn@gmail.com>, 2022
 */

export interface ITask {
  id: number,
  list: string,
  text: string,
  level: number,
  created: number,
  modified?: number,
  due?: number,
  completed?: number,
  owner: string,
  assignee: string
}
