import {getParent, Instance, types} from 'mobx-state-tree';

const TaskModel = types.model('TaskModel').props({
  id: types.identifier,
  task: types.string,
  isCompleted: types.optional(types.boolean, false),
  creationDate: types.Date,
});

export const Task = TaskModel.actions(self => ({
  markAsCompleted() {
    self.isCompleted = !self.isCompleted;
  },
  delete() {
    getParent(self, 2).removeTask(self);
  },
}));

export interface TaskType extends Instance<typeof TaskModel> {}

// onSnapshot(initialStore, (snapshot) => {
//   console.log("Snapshot: ", snapshot)
//   localStorage.setItem("rootState", JSON.stringify(snapshot))
// })
