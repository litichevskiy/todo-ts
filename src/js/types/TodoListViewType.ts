import Todo from './Todo';

interface TodoListViewType {
  container: HTMLUListElement;
  todoHandler: Function;
  clickHandler( event :Event ) :void;
  createTodos( todos: Todo[] ) :void;
  deleteTodo( id: string ) :void;
  clearTodoList() :void;
  replaceTodo( todo :Todo ) :void;
};

export default TodoListViewType;