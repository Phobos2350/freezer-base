import { List } from 'immutable';
import { TasksState } from './reducer';
import { getVisibleTasks } from './selectors';
import { Task } from './task';


describe('Tasks selectors', () => {
  let tasks;

  beforeEach(() => {
    tasks = new TasksState({
      list: new List([
        new Task({basket: false, title: 'task-1'}),
        new Task({basket: true, title: 'task-2'})
      ])
    });
  });


  describe('getVisibleTasks()', () => {
    it('should return list of all tasks', () => {
      let taskList = getVisibleTasks({tasks});
      expect(taskList.size).toBe(2);
    });

    it('should return list of active (incomplete) tasks', () => {
      tasks = tasks.set('filter', 'kitchen');
      let taskList = getVisibleTasks({tasks});

      expect(taskList.size).toBe(1);
      expect(taskList.get(0).title).toBe('task-1');
    });

    it('should return list of basket tasks', () => {
      tasks = tasks.set('filter', 'basket');
      let taskList = getVisibleTasks({tasks});

      expect(taskList.size).toBe(1);
      expect(taskList.get(0).title).toBe('task-2');
    });
  });
});
