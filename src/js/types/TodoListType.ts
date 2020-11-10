import TodosViewType from './TodosViewType';
import Todo from './Todo';
import PubSubType from './PubSubType';
import StorageType from './StorageType';

interface TodoListType {
  todosView: TodosViewType;
  pubsub: PubSubType;
  storage: StorageType;
  clickHandler({ id, role }:{ role :string, id :string }) :void
  addTodo( todos :Todo[] ) :void;
  deleteTodo( id: string ) :void;
  updateTodoStatus( id :string ) :void;
  editTodo( id :string ) :void;
  sortTodos( role :string ) :void;
  filter: string;
};

export default TodoListType;