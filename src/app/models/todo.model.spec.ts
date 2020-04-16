import { Todo, TodoData } from './todo.model';

describe('Todo', () => {
  it('should create an instance of Todo', () => {
    expect(new Todo()).toBeTruthy();
  });
  it('should create an instance of TodoData', () => {
    expect(new TodoData()).toBeTruthy();
  });
});
