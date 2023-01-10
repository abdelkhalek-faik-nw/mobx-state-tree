import {applySnapshot, destroy, Instance, types} from 'mobx-state-tree';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_PENDING,
  TODAYS_TASKS,
} from '../constans/taskFilters';
import {Task, TaskType} from './Task';

export const arrayFilters = [
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_PENDING,
  TODAYS_TASKS,
];
const filterType = types.union(...arrayFilters.map(types.literal));

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_PENDING]: (task: TaskType) => !task.isCompleted,
  [SHOW_COMPLETED]: (task: TaskType) => task.isCompleted,
  [TODAYS_TASKS]: (task: TaskType) =>
    (task.creationDate.getDay = new Date().getDay),
};

const TasksStore = types
  .model('TasksStore')
  .props({
    tasks: types.array(Task),
    filter: types.optional(filterType, SHOW_ALL),
  })
  .views(self => ({
    get pendingTasksCount() {
      return self.tasks.filter(task => !task.isCompleted).length;
    },
    get completedTasksCount() {
      return self.tasks.length - this.pendingTasksCount;
    },
    get filteredTasks() {
      return self.tasks.filter(TODO_FILTERS[self.filter]);
    },
  }))
  .actions(self => ({
    addTask(task: TaskType) {
      self.tasks.unshift(task);
    },
    removeTask(task: TaskType) {
      destroy(task);
    },
    resetTasks() {
      applySnapshot(self, {});
    },
    setFilter(filter) {
      self.filter = filter;
    },
  }));

interface TasksStoreType extends Instance<typeof TasksStore> {}

let _tasksStore: TasksStoreType;
export const useTasksStore = () => {
  if (!_tasksStore) {
    _tasksStore = TasksStore.create({
      tasks: [],
    });
  }

  return _tasksStore;
};
