import Todo from '../types/Todo';
import TodoListViewType from '../types/TodoListViewType';
import createTodo from '../view-components/createTodo';
import getParentNode from '../utils/getParentNode';

class TodoListView implements TodoListViewType {
  container: HTMLUListElement;
  todoHandler: Function;

  constructor({ container, todoHandler }) {
    this.container = container;
    this.todoHandler = todoHandler;
    this.container.addEventListener('click', this.clickHandler );
  }

  clickHandler = ( event :Event ) :void => {
    const target = event.target as HTMLElement;
    if( target === this.container ) return;
    const role = target.getAttribute('data-role');
    if( !role ) return;
    const li = getParentNode( target, 'LI' );
    const id = li.getAttribute('id');
    this.todoHandler({ role, id });
  }

  createTodos = ( todos: Todo[] ) :void => {
    const fragment = document.createDocumentFragment();
    const result = todos.reduce(( combaine, item ) => {
        combaine.append( createTodo( item ) );
        return combaine;
      }, fragment );

    this.container.prepend( fragment );
  }

  deleteTodo( id: string ) :void {
    const todo :HTMLElement = this.container.querySelector(`[id="${id}"]`);
    if( todo ) this.container.removeChild( todo );
  }

  clearTodoList() :void {
    this.container.innerHTML = '';
  }

  replaceTodo = ( todo :Todo ) :void => {
    const oldTodo = this.container.querySelector(`[id="${todo.id}"]`);
    const newTodo = createTodo( todo );
    this.container.replaceChild( newTodo, oldTodo );
  }
};

export default TodoListView;