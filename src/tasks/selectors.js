import { createSelector } from 'reselect';


export function getTasks(state) {
  return state.tasks;
}

export function getTaskList(state) {
  return getTasks(state).list;
}

export function getTaskFilter(state) {
  return getTasks(state).filter;
}

export function getDeletedTask(state) {
  return getTasks(state).deleted;
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleTasks = createSelector(
  getTaskList,
  getTaskFilter,
  (tasks, filter) => {
    switch (filter) {
      case 'kitchen':
        return tasks.filter(task => task.freezer);
      
      case 'garage':
        return tasks.filter(task => !task.freezer)

      case 'empty':
        return tasks.filter(task => task.qty === 0)

      case 'basket':
        return tasks.filter(task => task.basket);

      default:
        return tasks;
    }
  }
);
