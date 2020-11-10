import Todo from './Todo';

interface TodosViewType {
  container: HTMLUListElement;
  todoHandler: Function;
  clickHandler( event :Event ) :void;
  createTodos( todos :Todo[] ) :void;
  deleteTodo( id :string ) :void;
  clearTodoList() :void;
  replaceTodo( todo :Todo ) :void;
}

export default TodosViewType;